package com.localizeus.core.web.rest;

import com.localizeus.core.LocalizeusNoElasticApp;
import com.localizeus.core.domain.ApiKey;
import com.localizeus.core.repository.ApiKeyRepository;
import com.localizeus.core.service.ApiKeyService;
import com.localizeus.core.service.dto.ApiKeyDTO;
import com.localizeus.core.service.mapper.ApiKeyMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ApiKeyResource} REST controller.
 */
@SpringBootTest(classes = LocalizeusNoElasticApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ApiKeyResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ApiKeyRepository apiKeyRepository;

    @Autowired
    private ApiKeyMapper apiKeyMapper;

    @Autowired
    private ApiKeyService apiKeyService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restApiKeyMockMvc;

    private ApiKey apiKey;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ApiKey createEntity(EntityManager em) {
        ApiKey apiKey = new ApiKey()
            .value(DEFAULT_VALUE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return apiKey;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ApiKey createUpdatedEntity(EntityManager em) {
        ApiKey apiKey = new ApiKey()
            .value(UPDATED_VALUE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return apiKey;
    }

    @BeforeEach
    public void initTest() {
        apiKey = createEntity(em);
    }

    @Test
    @Transactional
    public void createApiKey() throws Exception {
        int databaseSizeBeforeCreate = apiKeyRepository.findAll().size();
        // Create the ApiKey
        ApiKeyDTO apiKeyDTO = apiKeyMapper.toDto(apiKey);
        restApiKeyMockMvc.perform(post("/api/api-keys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(apiKeyDTO)))
            .andExpect(status().isCreated());

        // Validate the ApiKey in the database
        List<ApiKey> apiKeyList = apiKeyRepository.findAll();
        assertThat(apiKeyList).hasSize(databaseSizeBeforeCreate + 1);
        ApiKey testApiKey = apiKeyList.get(apiKeyList.size() - 1);
        assertThat(testApiKey.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testApiKey.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testApiKey.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    @Transactional
    public void createApiKeyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = apiKeyRepository.findAll().size();

        // Create the ApiKey with an existing ID
        apiKey.setId(1L);
        ApiKeyDTO apiKeyDTO = apiKeyMapper.toDto(apiKey);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApiKeyMockMvc.perform(post("/api/api-keys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(apiKeyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ApiKey in the database
        List<ApiKey> apiKeyList = apiKeyRepository.findAll();
        assertThat(apiKeyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllApiKeys() throws Exception {
        // Initialize the database
        apiKeyRepository.saveAndFlush(apiKey);

        // Get all the apiKeyList
        restApiKeyMockMvc.perform(get("/api/api-keys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(apiKey.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getApiKey() throws Exception {
        // Initialize the database
        apiKeyRepository.saveAndFlush(apiKey);

        // Get the apiKey
        restApiKeyMockMvc.perform(get("/api/api-keys/{id}", apiKey.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(apiKey.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingApiKey() throws Exception {
        // Get the apiKey
        restApiKeyMockMvc.perform(get("/api/api-keys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApiKey() throws Exception {
        // Initialize the database
        apiKeyRepository.saveAndFlush(apiKey);

        int databaseSizeBeforeUpdate = apiKeyRepository.findAll().size();

        // Update the apiKey
        ApiKey updatedApiKey = apiKeyRepository.findById(apiKey.getId()).get();
        // Disconnect from session so that the updates on updatedApiKey are not directly saved in db
        em.detach(updatedApiKey);
        updatedApiKey
            .value(UPDATED_VALUE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        ApiKeyDTO apiKeyDTO = apiKeyMapper.toDto(updatedApiKey);

        restApiKeyMockMvc.perform(put("/api/api-keys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(apiKeyDTO)))
            .andExpect(status().isOk());

        // Validate the ApiKey in the database
        List<ApiKey> apiKeyList = apiKeyRepository.findAll();
        assertThat(apiKeyList).hasSize(databaseSizeBeforeUpdate);
        ApiKey testApiKey = apiKeyList.get(apiKeyList.size() - 1);
        assertThat(testApiKey.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testApiKey.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testApiKey.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingApiKey() throws Exception {
        int databaseSizeBeforeUpdate = apiKeyRepository.findAll().size();

        // Create the ApiKey
        ApiKeyDTO apiKeyDTO = apiKeyMapper.toDto(apiKey);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApiKeyMockMvc.perform(put("/api/api-keys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(apiKeyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ApiKey in the database
        List<ApiKey> apiKeyList = apiKeyRepository.findAll();
        assertThat(apiKeyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteApiKey() throws Exception {
        // Initialize the database
        apiKeyRepository.saveAndFlush(apiKey);

        int databaseSizeBeforeDelete = apiKeyRepository.findAll().size();

        // Delete the apiKey
        restApiKeyMockMvc.perform(delete("/api/api-keys/{id}", apiKey.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ApiKey> apiKeyList = apiKeyRepository.findAll();
        assertThat(apiKeyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
