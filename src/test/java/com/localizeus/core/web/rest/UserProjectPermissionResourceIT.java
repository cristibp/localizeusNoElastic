package com.localizeus.core.web.rest;

import com.localizeus.core.LocalizeusNoElasticApp;
import com.localizeus.core.domain.UserProjectPermission;
import com.localizeus.core.repository.UserProjectPermissionRepository;
import com.localizeus.core.service.UserProjectPermissionService;
import com.localizeus.core.service.dto.UserProjectPermissionDTO;
import com.localizeus.core.service.mapper.UserProjectPermissionMapper;

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
 * Integration tests for the {@link UserProjectPermissionResource} REST controller.
 */
@SpringBootTest(classes = LocalizeusNoElasticApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UserProjectPermissionResourceIT {

    @Autowired
    private UserProjectPermissionRepository userProjectPermissionRepository;

    @Autowired
    private UserProjectPermissionMapper userProjectPermissionMapper;

    @Autowired
    private UserProjectPermissionService userProjectPermissionService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserProjectPermissionMockMvc;

    private UserProjectPermission userProjectPermission;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserProjectPermission createEntity(EntityManager em) {
        UserProjectPermission userProjectPermission = new UserProjectPermission();
        return userProjectPermission;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserProjectPermission createUpdatedEntity(EntityManager em) {
        UserProjectPermission userProjectPermission = new UserProjectPermission();
        return userProjectPermission;
    }

    @BeforeEach
    public void initTest() {
        userProjectPermission = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserProjectPermission() throws Exception {
        int databaseSizeBeforeCreate = userProjectPermissionRepository.findAll().size();
        // Create the UserProjectPermission
        UserProjectPermissionDTO userProjectPermissionDTO = userProjectPermissionMapper.toDto(userProjectPermission);
        restUserProjectPermissionMockMvc.perform(post("/api/user-project-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userProjectPermissionDTO)))
            .andExpect(status().isCreated());

        // Validate the UserProjectPermission in the database
        List<UserProjectPermission> userProjectPermissionList = userProjectPermissionRepository.findAll();
        assertThat(userProjectPermissionList).hasSize(databaseSizeBeforeCreate + 1);
        UserProjectPermission testUserProjectPermission = userProjectPermissionList.get(userProjectPermissionList.size() - 1);
    }

    @Test
    @Transactional
    public void createUserProjectPermissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userProjectPermissionRepository.findAll().size();

        // Create the UserProjectPermission with an existing ID
        userProjectPermission.setId(1L);
        UserProjectPermissionDTO userProjectPermissionDTO = userProjectPermissionMapper.toDto(userProjectPermission);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserProjectPermissionMockMvc.perform(post("/api/user-project-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userProjectPermissionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserProjectPermission in the database
        List<UserProjectPermission> userProjectPermissionList = userProjectPermissionRepository.findAll();
        assertThat(userProjectPermissionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserProjectPermissions() throws Exception {
        // Initialize the database
        userProjectPermissionRepository.saveAndFlush(userProjectPermission);

        // Get all the userProjectPermissionList
        restUserProjectPermissionMockMvc.perform(get("/api/user-project-permissions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userProjectPermission.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getUserProjectPermission() throws Exception {
        // Initialize the database
        userProjectPermissionRepository.saveAndFlush(userProjectPermission);

        // Get the userProjectPermission
        restUserProjectPermissionMockMvc.perform(get("/api/user-project-permissions/{id}", userProjectPermission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userProjectPermission.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingUserProjectPermission() throws Exception {
        // Get the userProjectPermission
        restUserProjectPermissionMockMvc.perform(get("/api/user-project-permissions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserProjectPermission() throws Exception {
        // Initialize the database
        userProjectPermissionRepository.saveAndFlush(userProjectPermission);

        int databaseSizeBeforeUpdate = userProjectPermissionRepository.findAll().size();

        // Update the userProjectPermission
        UserProjectPermission updatedUserProjectPermission = userProjectPermissionRepository.findById(userProjectPermission.getId()).get();
        // Disconnect from session so that the updates on updatedUserProjectPermission are not directly saved in db
        em.detach(updatedUserProjectPermission);
        UserProjectPermissionDTO userProjectPermissionDTO = userProjectPermissionMapper.toDto(updatedUserProjectPermission);

        restUserProjectPermissionMockMvc.perform(put("/api/user-project-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userProjectPermissionDTO)))
            .andExpect(status().isOk());

        // Validate the UserProjectPermission in the database
        List<UserProjectPermission> userProjectPermissionList = userProjectPermissionRepository.findAll();
        assertThat(userProjectPermissionList).hasSize(databaseSizeBeforeUpdate);
        UserProjectPermission testUserProjectPermission = userProjectPermissionList.get(userProjectPermissionList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUserProjectPermission() throws Exception {
        int databaseSizeBeforeUpdate = userProjectPermissionRepository.findAll().size();

        // Create the UserProjectPermission
        UserProjectPermissionDTO userProjectPermissionDTO = userProjectPermissionMapper.toDto(userProjectPermission);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserProjectPermissionMockMvc.perform(put("/api/user-project-permissions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userProjectPermissionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserProjectPermission in the database
        List<UserProjectPermission> userProjectPermissionList = userProjectPermissionRepository.findAll();
        assertThat(userProjectPermissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserProjectPermission() throws Exception {
        // Initialize the database
        userProjectPermissionRepository.saveAndFlush(userProjectPermission);

        int databaseSizeBeforeDelete = userProjectPermissionRepository.findAll().size();

        // Delete the userProjectPermission
        restUserProjectPermissionMockMvc.perform(delete("/api/user-project-permissions/{id}", userProjectPermission.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserProjectPermission> userProjectPermissionList = userProjectPermissionRepository.findAll();
        assertThat(userProjectPermissionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
