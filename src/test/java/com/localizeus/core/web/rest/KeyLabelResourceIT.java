package com.localizeus.core.web.rest;

import com.localizeus.core.LocalizeusNoElasticApp;
import com.localizeus.core.domain.KeyLabel;
import com.localizeus.core.repository.KeyLabelRepository;
import com.localizeus.core.service.KeyLabelService;
import com.localizeus.core.service.dto.KeyLabelDTO;
import com.localizeus.core.service.mapper.KeyLabelMapper;

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
 * Integration tests for the {@link KeyLabelResource} REST controller.
 */
@SpringBootTest(classes = LocalizeusNoElasticApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class KeyLabelResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private KeyLabelRepository keyLabelRepository;

    @Autowired
    private KeyLabelMapper keyLabelMapper;

    @Autowired
    private KeyLabelService keyLabelService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restKeyLabelMockMvc;

    private KeyLabel keyLabel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KeyLabel createEntity(EntityManager em) {
        KeyLabel keyLabel = new KeyLabel()
            .value(DEFAULT_VALUE);
        return keyLabel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KeyLabel createUpdatedEntity(EntityManager em) {
        KeyLabel keyLabel = new KeyLabel()
            .value(UPDATED_VALUE);
        return keyLabel;
    }

    @BeforeEach
    public void initTest() {
        keyLabel = createEntity(em);
    }

    @Test
    @Transactional
    public void createKeyLabel() throws Exception {
        int databaseSizeBeforeCreate = keyLabelRepository.findAll().size();
        // Create the KeyLabel
        KeyLabelDTO keyLabelDTO = keyLabelMapper.toDto(keyLabel);
        restKeyLabelMockMvc.perform(post("/api/key-labels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(keyLabelDTO)))
            .andExpect(status().isCreated());

        // Validate the KeyLabel in the database
        List<KeyLabel> keyLabelList = keyLabelRepository.findAll();
        assertThat(keyLabelList).hasSize(databaseSizeBeforeCreate + 1);
        KeyLabel testKeyLabel = keyLabelList.get(keyLabelList.size() - 1);
        assertThat(testKeyLabel.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createKeyLabelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = keyLabelRepository.findAll().size();

        // Create the KeyLabel with an existing ID
        keyLabel.setId(1L);
        KeyLabelDTO keyLabelDTO = keyLabelMapper.toDto(keyLabel);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKeyLabelMockMvc.perform(post("/api/key-labels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(keyLabelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the KeyLabel in the database
        List<KeyLabel> keyLabelList = keyLabelRepository.findAll();
        assertThat(keyLabelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllKeyLabels() throws Exception {
        // Initialize the database
        keyLabelRepository.saveAndFlush(keyLabel);

        // Get all the keyLabelList
        restKeyLabelMockMvc.perform(get("/api/key-labels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(keyLabel.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));
    }
    
    @Test
    @Transactional
    public void getKeyLabel() throws Exception {
        // Initialize the database
        keyLabelRepository.saveAndFlush(keyLabel);

        // Get the keyLabel
        restKeyLabelMockMvc.perform(get("/api/key-labels/{id}", keyLabel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(keyLabel.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE));
    }
    @Test
    @Transactional
    public void getNonExistingKeyLabel() throws Exception {
        // Get the keyLabel
        restKeyLabelMockMvc.perform(get("/api/key-labels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKeyLabel() throws Exception {
        // Initialize the database
        keyLabelRepository.saveAndFlush(keyLabel);

        int databaseSizeBeforeUpdate = keyLabelRepository.findAll().size();

        // Update the keyLabel
        KeyLabel updatedKeyLabel = keyLabelRepository.findById(keyLabel.getId()).get();
        // Disconnect from session so that the updates on updatedKeyLabel are not directly saved in db
        em.detach(updatedKeyLabel);
        updatedKeyLabel
            .value(UPDATED_VALUE);
        KeyLabelDTO keyLabelDTO = keyLabelMapper.toDto(updatedKeyLabel);

        restKeyLabelMockMvc.perform(put("/api/key-labels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(keyLabelDTO)))
            .andExpect(status().isOk());

        // Validate the KeyLabel in the database
        List<KeyLabel> keyLabelList = keyLabelRepository.findAll();
        assertThat(keyLabelList).hasSize(databaseSizeBeforeUpdate);
        KeyLabel testKeyLabel = keyLabelList.get(keyLabelList.size() - 1);
        assertThat(testKeyLabel.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingKeyLabel() throws Exception {
        int databaseSizeBeforeUpdate = keyLabelRepository.findAll().size();

        // Create the KeyLabel
        KeyLabelDTO keyLabelDTO = keyLabelMapper.toDto(keyLabel);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restKeyLabelMockMvc.perform(put("/api/key-labels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(keyLabelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the KeyLabel in the database
        List<KeyLabel> keyLabelList = keyLabelRepository.findAll();
        assertThat(keyLabelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteKeyLabel() throws Exception {
        // Initialize the database
        keyLabelRepository.saveAndFlush(keyLabel);

        int databaseSizeBeforeDelete = keyLabelRepository.findAll().size();

        // Delete the keyLabel
        restKeyLabelMockMvc.perform(delete("/api/key-labels/{id}", keyLabel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<KeyLabel> keyLabelList = keyLabelRepository.findAll();
        assertThat(keyLabelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
