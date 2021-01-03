package com.localizeus.core.web.rest;

import com.localizeus.core.LocalizeusNoElasticApp;
import com.localizeus.core.domain.ProjectHistory;
import com.localizeus.core.repository.ProjectHistoryRepository;
import com.localizeus.core.service.ProjectHistoryService;
import com.localizeus.core.service.dto.ProjectHistoryDTO;
import com.localizeus.core.service.mapper.ProjectHistoryMapper;

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

import com.localizeus.core.domain.enumeration.ProjectActions;
/**
 * Integration tests for the {@link ProjectHistoryResource} REST controller.
 */
@SpringBootTest(classes = LocalizeusNoElasticApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProjectHistoryResourceIT {

    private static final ProjectActions DEFAULT_ACTION = ProjectActions.ADD;
    private static final ProjectActions UPDATED_ACTION = ProjectActions.DELETE;

    private static final String DEFAULT_OLD_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_OLD_VALUE = "BBBBBBBBBB";

    private static final String DEFAULT_NEW_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_NEW_VALUE = "BBBBBBBBBB";

    @Autowired
    private ProjectHistoryRepository projectHistoryRepository;

    @Autowired
    private ProjectHistoryMapper projectHistoryMapper;

    @Autowired
    private ProjectHistoryService projectHistoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProjectHistoryMockMvc;

    private ProjectHistory projectHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectHistory createEntity(EntityManager em) {
        ProjectHistory projectHistory = new ProjectHistory()
            .action(DEFAULT_ACTION)
            .oldValue(DEFAULT_OLD_VALUE)
            .newValue(DEFAULT_NEW_VALUE);
        return projectHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectHistory createUpdatedEntity(EntityManager em) {
        ProjectHistory projectHistory = new ProjectHistory()
            .action(UPDATED_ACTION)
            .oldValue(UPDATED_OLD_VALUE)
            .newValue(UPDATED_NEW_VALUE);
        return projectHistory;
    }

    @BeforeEach
    public void initTest() {
        projectHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createProjectHistory() throws Exception {
        int databaseSizeBeforeCreate = projectHistoryRepository.findAll().size();
        // Create the ProjectHistory
        ProjectHistoryDTO projectHistoryDTO = projectHistoryMapper.toDto(projectHistory);
        restProjectHistoryMockMvc.perform(post("/api/project-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(projectHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the ProjectHistory in the database
        List<ProjectHistory> projectHistoryList = projectHistoryRepository.findAll();
        assertThat(projectHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        ProjectHistory testProjectHistory = projectHistoryList.get(projectHistoryList.size() - 1);
        assertThat(testProjectHistory.getAction()).isEqualTo(DEFAULT_ACTION);
        assertThat(testProjectHistory.getOldValue()).isEqualTo(DEFAULT_OLD_VALUE);
        assertThat(testProjectHistory.getNewValue()).isEqualTo(DEFAULT_NEW_VALUE);
    }

    @Test
    @Transactional
    public void createProjectHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projectHistoryRepository.findAll().size();

        // Create the ProjectHistory with an existing ID
        projectHistory.setId(1L);
        ProjectHistoryDTO projectHistoryDTO = projectHistoryMapper.toDto(projectHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectHistoryMockMvc.perform(post("/api/project-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(projectHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectHistory in the database
        List<ProjectHistory> projectHistoryList = projectHistoryRepository.findAll();
        assertThat(projectHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProjectHistories() throws Exception {
        // Initialize the database
        projectHistoryRepository.saveAndFlush(projectHistory);

        // Get all the projectHistoryList
        restProjectHistoryMockMvc.perform(get("/api/project-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())))
            .andExpect(jsonPath("$.[*].oldValue").value(hasItem(DEFAULT_OLD_VALUE)))
            .andExpect(jsonPath("$.[*].newValue").value(hasItem(DEFAULT_NEW_VALUE)));
    }
    
    @Test
    @Transactional
    public void getProjectHistory() throws Exception {
        // Initialize the database
        projectHistoryRepository.saveAndFlush(projectHistory);

        // Get the projectHistory
        restProjectHistoryMockMvc.perform(get("/api/project-histories/{id}", projectHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(projectHistory.getId().intValue()))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION.toString()))
            .andExpect(jsonPath("$.oldValue").value(DEFAULT_OLD_VALUE))
            .andExpect(jsonPath("$.newValue").value(DEFAULT_NEW_VALUE));
    }
    @Test
    @Transactional
    public void getNonExistingProjectHistory() throws Exception {
        // Get the projectHistory
        restProjectHistoryMockMvc.perform(get("/api/project-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProjectHistory() throws Exception {
        // Initialize the database
        projectHistoryRepository.saveAndFlush(projectHistory);

        int databaseSizeBeforeUpdate = projectHistoryRepository.findAll().size();

        // Update the projectHistory
        ProjectHistory updatedProjectHistory = projectHistoryRepository.findById(projectHistory.getId()).get();
        // Disconnect from session so that the updates on updatedProjectHistory are not directly saved in db
        em.detach(updatedProjectHistory);
        updatedProjectHistory
            .action(UPDATED_ACTION)
            .oldValue(UPDATED_OLD_VALUE)
            .newValue(UPDATED_NEW_VALUE);
        ProjectHistoryDTO projectHistoryDTO = projectHistoryMapper.toDto(updatedProjectHistory);

        restProjectHistoryMockMvc.perform(put("/api/project-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(projectHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the ProjectHistory in the database
        List<ProjectHistory> projectHistoryList = projectHistoryRepository.findAll();
        assertThat(projectHistoryList).hasSize(databaseSizeBeforeUpdate);
        ProjectHistory testProjectHistory = projectHistoryList.get(projectHistoryList.size() - 1);
        assertThat(testProjectHistory.getAction()).isEqualTo(UPDATED_ACTION);
        assertThat(testProjectHistory.getOldValue()).isEqualTo(UPDATED_OLD_VALUE);
        assertThat(testProjectHistory.getNewValue()).isEqualTo(UPDATED_NEW_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingProjectHistory() throws Exception {
        int databaseSizeBeforeUpdate = projectHistoryRepository.findAll().size();

        // Create the ProjectHistory
        ProjectHistoryDTO projectHistoryDTO = projectHistoryMapper.toDto(projectHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectHistoryMockMvc.perform(put("/api/project-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(projectHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectHistory in the database
        List<ProjectHistory> projectHistoryList = projectHistoryRepository.findAll();
        assertThat(projectHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProjectHistory() throws Exception {
        // Initialize the database
        projectHistoryRepository.saveAndFlush(projectHistory);

        int databaseSizeBeforeDelete = projectHistoryRepository.findAll().size();

        // Delete the projectHistory
        restProjectHistoryMockMvc.perform(delete("/api/project-histories/{id}", projectHistory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProjectHistory> projectHistoryList = projectHistoryRepository.findAll();
        assertThat(projectHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
