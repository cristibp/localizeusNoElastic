package com.localizeus.core.web.rest;

import com.localizeus.core.LocalizeusNoElasticApp;
import com.localizeus.core.domain.UserPermission;
import com.localizeus.core.repository.UserPermissionRepository;
import com.localizeus.core.service.UserPermissionService;
import com.localizeus.core.service.dto.UserPermissionDTO;
import com.localizeus.core.service.mapper.UserPermissionMapper;

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

import com.localizeus.core.domain.enumeration.PermissionType;
/**
 * Integration tests for the {@link UserPermissionResource} REST controller.
 */
@SpringBootTest(classes = LocalizeusNoElasticApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UserPermissionResourceIT {

    private static final PermissionType DEFAULT_TYPE = PermissionType.READ;
    private static final PermissionType UPDATED_TYPE = PermissionType.CREATE;

    @Autowired
    private UserPermissionRepository userPermissionRepository;

    @Autowired
    private UserPermissionMapper userPermissionMapper;

    @Autowired
    private UserPermissionService userPermissionService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserPermissionMockMvc;

    private UserPermission userPermission;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserPermission createEntity(EntityManager em) {
        UserPermission userPermission = new UserPermission()
            .type(DEFAULT_TYPE);
        return userPermission;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserPermission createUpdatedEntity(EntityManager em) {
        UserPermission userPermission = new UserPermission()
            .type(UPDATED_TYPE);
        return userPermission;
    }

    @BeforeEach
    public void initTest() {
        userPermission = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserPermission() throws Exception {
        int databaseSizeBeforeCreate = userPermissionRepository.findAll().size();
        // Create the UserPermission
        UserPermissionDTO userPermissionDTO = userPermissionMapper.toDto(userPermission);
        restUserPermissionMockMvc.perform(post("/api/user-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userPermissionDTO)))
            .andExpect(status().isCreated());

        // Validate the UserPermission in the database
        List<UserPermission> userPermissionList = userPermissionRepository.findAll();
        assertThat(userPermissionList).hasSize(databaseSizeBeforeCreate + 1);
        UserPermission testUserPermission = userPermissionList.get(userPermissionList.size() - 1);
        assertThat(testUserPermission.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createUserPermissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userPermissionRepository.findAll().size();

        // Create the UserPermission with an existing ID
        userPermission.setId(1L);
        UserPermissionDTO userPermissionDTO = userPermissionMapper.toDto(userPermission);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserPermissionMockMvc.perform(post("/api/user-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userPermissionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserPermission in the database
        List<UserPermission> userPermissionList = userPermissionRepository.findAll();
        assertThat(userPermissionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserPermissions() throws Exception {
        // Initialize the database
        userPermissionRepository.saveAndFlush(userPermission);

        // Get all the userPermissionList
        restUserPermissionMockMvc.perform(get("/api/user-permissions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userPermission.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getUserPermission() throws Exception {
        // Initialize the database
        userPermissionRepository.saveAndFlush(userPermission);

        // Get the userPermission
        restUserPermissionMockMvc.perform(get("/api/user-permissions/{id}", userPermission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userPermission.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingUserPermission() throws Exception {
        // Get the userPermission
        restUserPermissionMockMvc.perform(get("/api/user-permissions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserPermission() throws Exception {
        // Initialize the database
        userPermissionRepository.saveAndFlush(userPermission);

        int databaseSizeBeforeUpdate = userPermissionRepository.findAll().size();

        // Update the userPermission
        UserPermission updatedUserPermission = userPermissionRepository.findById(userPermission.getId()).get();
        // Disconnect from session so that the updates on updatedUserPermission are not directly saved in db
        em.detach(updatedUserPermission);
        updatedUserPermission
            .type(UPDATED_TYPE);
        UserPermissionDTO userPermissionDTO = userPermissionMapper.toDto(updatedUserPermission);

        restUserPermissionMockMvc.perform(put("/api/user-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userPermissionDTO)))
            .andExpect(status().isOk());

        // Validate the UserPermission in the database
        List<UserPermission> userPermissionList = userPermissionRepository.findAll();
        assertThat(userPermissionList).hasSize(databaseSizeBeforeUpdate);
        UserPermission testUserPermission = userPermissionList.get(userPermissionList.size() - 1);
        assertThat(testUserPermission.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserPermission() throws Exception {
        int databaseSizeBeforeUpdate = userPermissionRepository.findAll().size();

        // Create the UserPermission
        UserPermissionDTO userPermissionDTO = userPermissionMapper.toDto(userPermission);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserPermissionMockMvc.perform(put("/api/user-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userPermissionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserPermission in the database
        List<UserPermission> userPermissionList = userPermissionRepository.findAll();
        assertThat(userPermissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserPermission() throws Exception {
        // Initialize the database
        userPermissionRepository.saveAndFlush(userPermission);

        int databaseSizeBeforeDelete = userPermissionRepository.findAll().size();

        // Delete the userPermission
        restUserPermissionMockMvc.perform(delete("/api/user-permissions/{id}", userPermission.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserPermission> userPermissionList = userPermissionRepository.findAll();
        assertThat(userPermissionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
