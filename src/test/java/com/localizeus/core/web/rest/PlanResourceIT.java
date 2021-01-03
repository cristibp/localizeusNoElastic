package com.localizeus.core.web.rest;

import com.localizeus.core.LocalizeusNoElasticApp;
import com.localizeus.core.domain.Plan;
import com.localizeus.core.repository.PlanRepository;
import com.localizeus.core.service.PlanService;
import com.localizeus.core.service.dto.PlanDTO;
import com.localizeus.core.service.mapper.PlanMapper;

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

import com.localizeus.core.domain.enumeration.Periodicity;
/**
 * Integration tests for the {@link PlanResource} REST controller.
 */
@SpringBootTest(classes = LocalizeusNoElasticApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PlanResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_COST_IN_CENTS = 1L;
    private static final Long UPDATED_COST_IN_CENTS = 2L;

    private static final Long DEFAULT_KEY_LIMIT = 1L;
    private static final Long UPDATED_KEY_LIMIT = 2L;

    private static final Long DEFAULT_CALLS_LIMIT = 1L;
    private static final Long UPDATED_CALLS_LIMIT = 2L;

    private static final Periodicity DEFAULT_TYPE = Periodicity.MONTHLY;
    private static final Periodicity UPDATED_TYPE = Periodicity.SEMIANNUAL;

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private PlanMapper planMapper;

    @Autowired
    private PlanService planService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlanMockMvc;

    private Plan plan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plan createEntity(EntityManager em) {
        Plan plan = new Plan()
            .name(DEFAULT_NAME)
            .costInCents(DEFAULT_COST_IN_CENTS)
            .keyLimit(DEFAULT_KEY_LIMIT)
            .callsLimit(DEFAULT_CALLS_LIMIT)
            .type(DEFAULT_TYPE);
        return plan;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plan createUpdatedEntity(EntityManager em) {
        Plan plan = new Plan()
            .name(UPDATED_NAME)
            .costInCents(UPDATED_COST_IN_CENTS)
            .keyLimit(UPDATED_KEY_LIMIT)
            .callsLimit(UPDATED_CALLS_LIMIT)
            .type(UPDATED_TYPE);
        return plan;
    }

    @BeforeEach
    public void initTest() {
        plan = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlan() throws Exception {
        int databaseSizeBeforeCreate = planRepository.findAll().size();
        // Create the Plan
        PlanDTO planDTO = planMapper.toDto(plan);
        restPlanMockMvc.perform(post("/api/plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(planDTO)))
            .andExpect(status().isCreated());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeCreate + 1);
        Plan testPlan = planList.get(planList.size() - 1);
        assertThat(testPlan.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPlan.getCostInCents()).isEqualTo(DEFAULT_COST_IN_CENTS);
        assertThat(testPlan.getKeyLimit()).isEqualTo(DEFAULT_KEY_LIMIT);
        assertThat(testPlan.getCallsLimit()).isEqualTo(DEFAULT_CALLS_LIMIT);
        assertThat(testPlan.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planRepository.findAll().size();

        // Create the Plan with an existing ID
        plan.setId(1L);
        PlanDTO planDTO = planMapper.toDto(plan);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanMockMvc.perform(post("/api/plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(planDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlans() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        // Get all the planList
        restPlanMockMvc.perform(get("/api/plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plan.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].costInCents").value(hasItem(DEFAULT_COST_IN_CENTS.intValue())))
            .andExpect(jsonPath("$.[*].keyLimit").value(hasItem(DEFAULT_KEY_LIMIT.intValue())))
            .andExpect(jsonPath("$.[*].callsLimit").value(hasItem(DEFAULT_CALLS_LIMIT.intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getPlan() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        // Get the plan
        restPlanMockMvc.perform(get("/api/plans/{id}", plan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(plan.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.costInCents").value(DEFAULT_COST_IN_CENTS.intValue()))
            .andExpect(jsonPath("$.keyLimit").value(DEFAULT_KEY_LIMIT.intValue()))
            .andExpect(jsonPath("$.callsLimit").value(DEFAULT_CALLS_LIMIT.intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPlan() throws Exception {
        // Get the plan
        restPlanMockMvc.perform(get("/api/plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlan() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        int databaseSizeBeforeUpdate = planRepository.findAll().size();

        // Update the plan
        Plan updatedPlan = planRepository.findById(plan.getId()).get();
        // Disconnect from session so that the updates on updatedPlan are not directly saved in db
        em.detach(updatedPlan);
        updatedPlan
            .name(UPDATED_NAME)
            .costInCents(UPDATED_COST_IN_CENTS)
            .keyLimit(UPDATED_KEY_LIMIT)
            .callsLimit(UPDATED_CALLS_LIMIT)
            .type(UPDATED_TYPE);
        PlanDTO planDTO = planMapper.toDto(updatedPlan);

        restPlanMockMvc.perform(put("/api/plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(planDTO)))
            .andExpect(status().isOk());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeUpdate);
        Plan testPlan = planList.get(planList.size() - 1);
        assertThat(testPlan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPlan.getCostInCents()).isEqualTo(UPDATED_COST_IN_CENTS);
        assertThat(testPlan.getKeyLimit()).isEqualTo(UPDATED_KEY_LIMIT);
        assertThat(testPlan.getCallsLimit()).isEqualTo(UPDATED_CALLS_LIMIT);
        assertThat(testPlan.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlan() throws Exception {
        int databaseSizeBeforeUpdate = planRepository.findAll().size();

        // Create the Plan
        PlanDTO planDTO = planMapper.toDto(plan);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanMockMvc.perform(put("/api/plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(planDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlan() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        int databaseSizeBeforeDelete = planRepository.findAll().size();

        // Delete the plan
        restPlanMockMvc.perform(delete("/api/plans/{id}", plan.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
