package com.localizeus.core.web.rest;

import com.localizeus.core.LocalizeusNoElasticApp;
import com.localizeus.core.domain.Discussion;
import com.localizeus.core.repository.DiscussionRepository;
import com.localizeus.core.service.DiscussionService;
import com.localizeus.core.service.dto.DiscussionDTO;
import com.localizeus.core.service.mapper.DiscussionMapper;

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
 * Integration tests for the {@link DiscussionResource} REST controller.
 */
@SpringBootTest(classes = LocalizeusNoElasticApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DiscussionResourceIT {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private DiscussionMapper discussionMapper;

    @Autowired
    private DiscussionService discussionService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiscussionMockMvc;

    private Discussion discussion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Discussion createEntity(EntityManager em) {
        Discussion discussion = new Discussion()
            .value(DEFAULT_VALUE);
        return discussion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Discussion createUpdatedEntity(EntityManager em) {
        Discussion discussion = new Discussion()
            .value(UPDATED_VALUE);
        return discussion;
    }

    @BeforeEach
    public void initTest() {
        discussion = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiscussion() throws Exception {
        int databaseSizeBeforeCreate = discussionRepository.findAll().size();
        // Create the Discussion
        DiscussionDTO discussionDTO = discussionMapper.toDto(discussion);
        restDiscussionMockMvc.perform(post("/api/discussions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(discussionDTO)))
            .andExpect(status().isCreated());

        // Validate the Discussion in the database
        List<Discussion> discussionList = discussionRepository.findAll();
        assertThat(discussionList).hasSize(databaseSizeBeforeCreate + 1);
        Discussion testDiscussion = discussionList.get(discussionList.size() - 1);
        assertThat(testDiscussion.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createDiscussionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = discussionRepository.findAll().size();

        // Create the Discussion with an existing ID
        discussion.setId(1L);
        DiscussionDTO discussionDTO = discussionMapper.toDto(discussion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiscussionMockMvc.perform(post("/api/discussions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(discussionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Discussion in the database
        List<Discussion> discussionList = discussionRepository.findAll();
        assertThat(discussionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiscussions() throws Exception {
        // Initialize the database
        discussionRepository.saveAndFlush(discussion);

        // Get all the discussionList
        restDiscussionMockMvc.perform(get("/api/discussions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(discussion.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));
    }
    
    @Test
    @Transactional
    public void getDiscussion() throws Exception {
        // Initialize the database
        discussionRepository.saveAndFlush(discussion);

        // Get the discussion
        restDiscussionMockMvc.perform(get("/api/discussions/{id}", discussion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(discussion.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE));
    }
    @Test
    @Transactional
    public void getNonExistingDiscussion() throws Exception {
        // Get the discussion
        restDiscussionMockMvc.perform(get("/api/discussions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiscussion() throws Exception {
        // Initialize the database
        discussionRepository.saveAndFlush(discussion);

        int databaseSizeBeforeUpdate = discussionRepository.findAll().size();

        // Update the discussion
        Discussion updatedDiscussion = discussionRepository.findById(discussion.getId()).get();
        // Disconnect from session so that the updates on updatedDiscussion are not directly saved in db
        em.detach(updatedDiscussion);
        updatedDiscussion
            .value(UPDATED_VALUE);
        DiscussionDTO discussionDTO = discussionMapper.toDto(updatedDiscussion);

        restDiscussionMockMvc.perform(put("/api/discussions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(discussionDTO)))
            .andExpect(status().isOk());

        // Validate the Discussion in the database
        List<Discussion> discussionList = discussionRepository.findAll();
        assertThat(discussionList).hasSize(databaseSizeBeforeUpdate);
        Discussion testDiscussion = discussionList.get(discussionList.size() - 1);
        assertThat(testDiscussion.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingDiscussion() throws Exception {
        int databaseSizeBeforeUpdate = discussionRepository.findAll().size();

        // Create the Discussion
        DiscussionDTO discussionDTO = discussionMapper.toDto(discussion);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiscussionMockMvc.perform(put("/api/discussions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(discussionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Discussion in the database
        List<Discussion> discussionList = discussionRepository.findAll();
        assertThat(discussionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiscussion() throws Exception {
        // Initialize the database
        discussionRepository.saveAndFlush(discussion);

        int databaseSizeBeforeDelete = discussionRepository.findAll().size();

        // Delete the discussion
        restDiscussionMockMvc.perform(delete("/api/discussions/{id}", discussion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Discussion> discussionList = discussionRepository.findAll();
        assertThat(discussionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
