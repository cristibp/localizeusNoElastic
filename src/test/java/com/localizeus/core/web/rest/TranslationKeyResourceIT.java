package com.localizeus.core.web.rest;

import com.localizeus.core.LocalizeusNoElasticApp;
import com.localizeus.core.domain.TranslationKey;
import com.localizeus.core.repository.TranslationKeyRepository;
import com.localizeus.core.service.TranslationKeyService;
import com.localizeus.core.service.dto.TranslationKeyDTO;
import com.localizeus.core.service.mapper.TranslationKeyMapper;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TranslationKeyResource} REST controller.
 */
@SpringBootTest(classes = LocalizeusNoElasticApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TranslationKeyResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FALLBACK_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_FALLBACK_VALUE = "BBBBBBBBBB";

    @Autowired
    private TranslationKeyRepository translationKeyRepository;

    @Autowired
    private TranslationKeyMapper translationKeyMapper;

    @Autowired
    private TranslationKeyService translationKeyService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTranslationKeyMockMvc;

    private TranslationKey translationKey;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TranslationKey createEntity(EntityManager em) {
        TranslationKey translationKey = new TranslationKey()
            .name(DEFAULT_NAME)
            .fallbackValue(DEFAULT_FALLBACK_VALUE);
        return translationKey;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TranslationKey createUpdatedEntity(EntityManager em) {
        TranslationKey translationKey = new TranslationKey()
            .name(UPDATED_NAME)
            .fallbackValue(UPDATED_FALLBACK_VALUE);
        return translationKey;
    }

    @BeforeEach
    public void initTest() {
        translationKey = createEntity(em);
    }

    @Test
    @Transactional
    public void createTranslationKey() throws Exception {
        int databaseSizeBeforeCreate = translationKeyRepository.findAll().size();
        // Create the TranslationKey
        TranslationKeyDTO translationKeyDTO = translationKeyMapper.toDto(translationKey);
        restTranslationKeyMockMvc.perform(post("/api/translation-keys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(translationKeyDTO)))
            .andExpect(status().isCreated());

        // Validate the TranslationKey in the database
        List<TranslationKey> translationKeyList = translationKeyRepository.findAll();
        assertThat(translationKeyList).hasSize(databaseSizeBeforeCreate + 1);
        TranslationKey testTranslationKey = translationKeyList.get(translationKeyList.size() - 1);
        assertThat(testTranslationKey.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTranslationKey.getFallbackValue()).isEqualTo(DEFAULT_FALLBACK_VALUE);
    }

    @Test
    @Transactional
    public void createTranslationKeyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = translationKeyRepository.findAll().size();

        // Create the TranslationKey with an existing ID
        translationKey.setId(1L);
        TranslationKeyDTO translationKeyDTO = translationKeyMapper.toDto(translationKey);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTranslationKeyMockMvc.perform(post("/api/translation-keys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(translationKeyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TranslationKey in the database
        List<TranslationKey> translationKeyList = translationKeyRepository.findAll();
        assertThat(translationKeyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTranslationKeys() throws Exception {
        // Initialize the database
        translationKeyRepository.saveAndFlush(translationKey);

        // Get all the translationKeyList
        restTranslationKeyMockMvc.perform(get("/api/translation-keys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(translationKey.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].fallbackValue").value(hasItem(DEFAULT_FALLBACK_VALUE)));
    }
    
    @Test
    @Transactional
    public void getTranslationKey() throws Exception {
        // Initialize the database
        translationKeyRepository.saveAndFlush(translationKey);

        // Get the translationKey
        restTranslationKeyMockMvc.perform(get("/api/translation-keys/{id}", translationKey.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(translationKey.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.fallbackValue").value(DEFAULT_FALLBACK_VALUE));
    }
    @Test
    @Transactional
    public void getNonExistingTranslationKey() throws Exception {
        // Get the translationKey
        restTranslationKeyMockMvc.perform(get("/api/translation-keys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTranslationKey() throws Exception {
        // Initialize the database
        translationKeyRepository.saveAndFlush(translationKey);

        int databaseSizeBeforeUpdate = translationKeyRepository.findAll().size();

        // Update the translationKey
        TranslationKey updatedTranslationKey = translationKeyRepository.findById(translationKey.getId()).get();
        // Disconnect from session so that the updates on updatedTranslationKey are not directly saved in db
        em.detach(updatedTranslationKey);
        updatedTranslationKey
            .name(UPDATED_NAME)
            .fallbackValue(UPDATED_FALLBACK_VALUE);
        TranslationKeyDTO translationKeyDTO = translationKeyMapper.toDto(updatedTranslationKey);

        restTranslationKeyMockMvc.perform(put("/api/translation-keys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(translationKeyDTO)))
            .andExpect(status().isOk());

        // Validate the TranslationKey in the database
        List<TranslationKey> translationKeyList = translationKeyRepository.findAll();
        assertThat(translationKeyList).hasSize(databaseSizeBeforeUpdate);
        TranslationKey testTranslationKey = translationKeyList.get(translationKeyList.size() - 1);
        assertThat(testTranslationKey.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTranslationKey.getFallbackValue()).isEqualTo(UPDATED_FALLBACK_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingTranslationKey() throws Exception {
        int databaseSizeBeforeUpdate = translationKeyRepository.findAll().size();

        // Create the TranslationKey
        TranslationKeyDTO translationKeyDTO = translationKeyMapper.toDto(translationKey);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTranslationKeyMockMvc.perform(put("/api/translation-keys")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(translationKeyDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TranslationKey in the database
        List<TranslationKey> translationKeyList = translationKeyRepository.findAll();
        assertThat(translationKeyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTranslationKey() throws Exception {
        // Initialize the database
        translationKeyRepository.saveAndFlush(translationKey);

        int databaseSizeBeforeDelete = translationKeyRepository.findAll().size();

        // Delete the translationKey
        restTranslationKeyMockMvc.perform(delete("/api/translation-keys/{id}", translationKey.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TranslationKey> translationKeyList = translationKeyRepository.findAll();
        assertThat(translationKeyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
