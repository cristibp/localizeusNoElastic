package com.localizeus.core.web.rest;

import com.localizeus.core.LocalizeusNoElasticApp;
import com.localizeus.core.domain.ServiceSubscription;
import com.localizeus.core.repository.ServiceSubscriptionRepository;
import com.localizeus.core.service.ServiceSubscriptionService;
import com.localizeus.core.service.dto.ServiceSubscriptionDTO;
import com.localizeus.core.service.mapper.ServiceSubscriptionMapper;

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

import com.localizeus.core.domain.enumeration.Periodicity;
/**
 * Integration tests for the {@link ServiceSubscriptionResource} REST controller.
 */
@SpringBootTest(classes = LocalizeusNoElasticApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ServiceSubscriptionResourceIT {

    private static final LocalDate DEFAULT_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END = LocalDate.now(ZoneId.systemDefault());

    private static final Periodicity DEFAULT_PAYMENT_TYPE = Periodicity.MONTHLY;
    private static final Periodicity UPDATED_PAYMENT_TYPE = Periodicity.SEMIANNUAL;

    @Autowired
    private ServiceSubscriptionRepository serviceSubscriptionRepository;

    @Autowired
    private ServiceSubscriptionMapper serviceSubscriptionMapper;

    @Autowired
    private ServiceSubscriptionService serviceSubscriptionService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceSubscriptionMockMvc;

    private ServiceSubscription serviceSubscription;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceSubscription createEntity(EntityManager em) {
        ServiceSubscription serviceSubscription = new ServiceSubscription()
            .start(DEFAULT_START)
            .end(DEFAULT_END)
            .paymentType(DEFAULT_PAYMENT_TYPE);
        return serviceSubscription;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceSubscription createUpdatedEntity(EntityManager em) {
        ServiceSubscription serviceSubscription = new ServiceSubscription()
            .start(UPDATED_START)
            .end(UPDATED_END)
            .paymentType(UPDATED_PAYMENT_TYPE);
        return serviceSubscription;
    }

    @BeforeEach
    public void initTest() {
        serviceSubscription = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceSubscription() throws Exception {
        int databaseSizeBeforeCreate = serviceSubscriptionRepository.findAll().size();
        // Create the ServiceSubscription
        ServiceSubscriptionDTO serviceSubscriptionDTO = serviceSubscriptionMapper.toDto(serviceSubscription);
        restServiceSubscriptionMockMvc.perform(post("/api/service-subscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceSubscriptionDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceSubscription in the database
        List<ServiceSubscription> serviceSubscriptionList = serviceSubscriptionRepository.findAll();
        assertThat(serviceSubscriptionList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceSubscription testServiceSubscription = serviceSubscriptionList.get(serviceSubscriptionList.size() - 1);
        assertThat(testServiceSubscription.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testServiceSubscription.getEnd()).isEqualTo(DEFAULT_END);
        assertThat(testServiceSubscription.getPaymentType()).isEqualTo(DEFAULT_PAYMENT_TYPE);
    }

    @Test
    @Transactional
    public void createServiceSubscriptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceSubscriptionRepository.findAll().size();

        // Create the ServiceSubscription with an existing ID
        serviceSubscription.setId(1L);
        ServiceSubscriptionDTO serviceSubscriptionDTO = serviceSubscriptionMapper.toDto(serviceSubscription);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceSubscriptionMockMvc.perform(post("/api/service-subscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceSubscription in the database
        List<ServiceSubscription> serviceSubscriptionList = serviceSubscriptionRepository.findAll();
        assertThat(serviceSubscriptionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceSubscriptions() throws Exception {
        // Initialize the database
        serviceSubscriptionRepository.saveAndFlush(serviceSubscription);

        // Get all the serviceSubscriptionList
        restServiceSubscriptionMockMvc.perform(get("/api/service-subscriptions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceSubscription.getId().intValue())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())))
            .andExpect(jsonPath("$.[*].paymentType").value(hasItem(DEFAULT_PAYMENT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getServiceSubscription() throws Exception {
        // Initialize the database
        serviceSubscriptionRepository.saveAndFlush(serviceSubscription);

        // Get the serviceSubscription
        restServiceSubscriptionMockMvc.perform(get("/api/service-subscriptions/{id}", serviceSubscription.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceSubscription.getId().intValue()))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()))
            .andExpect(jsonPath("$.paymentType").value(DEFAULT_PAYMENT_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingServiceSubscription() throws Exception {
        // Get the serviceSubscription
        restServiceSubscriptionMockMvc.perform(get("/api/service-subscriptions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceSubscription() throws Exception {
        // Initialize the database
        serviceSubscriptionRepository.saveAndFlush(serviceSubscription);

        int databaseSizeBeforeUpdate = serviceSubscriptionRepository.findAll().size();

        // Update the serviceSubscription
        ServiceSubscription updatedServiceSubscription = serviceSubscriptionRepository.findById(serviceSubscription.getId()).get();
        // Disconnect from session so that the updates on updatedServiceSubscription are not directly saved in db
        em.detach(updatedServiceSubscription);
        updatedServiceSubscription
            .start(UPDATED_START)
            .end(UPDATED_END)
            .paymentType(UPDATED_PAYMENT_TYPE);
        ServiceSubscriptionDTO serviceSubscriptionDTO = serviceSubscriptionMapper.toDto(updatedServiceSubscription);

        restServiceSubscriptionMockMvc.perform(put("/api/service-subscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceSubscriptionDTO)))
            .andExpect(status().isOk());

        // Validate the ServiceSubscription in the database
        List<ServiceSubscription> serviceSubscriptionList = serviceSubscriptionRepository.findAll();
        assertThat(serviceSubscriptionList).hasSize(databaseSizeBeforeUpdate);
        ServiceSubscription testServiceSubscription = serviceSubscriptionList.get(serviceSubscriptionList.size() - 1);
        assertThat(testServiceSubscription.getStart()).isEqualTo(UPDATED_START);
        assertThat(testServiceSubscription.getEnd()).isEqualTo(UPDATED_END);
        assertThat(testServiceSubscription.getPaymentType()).isEqualTo(UPDATED_PAYMENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceSubscription() throws Exception {
        int databaseSizeBeforeUpdate = serviceSubscriptionRepository.findAll().size();

        // Create the ServiceSubscription
        ServiceSubscriptionDTO serviceSubscriptionDTO = serviceSubscriptionMapper.toDto(serviceSubscription);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceSubscriptionMockMvc.perform(put("/api/service-subscriptions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceSubscriptionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceSubscription in the database
        List<ServiceSubscription> serviceSubscriptionList = serviceSubscriptionRepository.findAll();
        assertThat(serviceSubscriptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceSubscription() throws Exception {
        // Initialize the database
        serviceSubscriptionRepository.saveAndFlush(serviceSubscription);

        int databaseSizeBeforeDelete = serviceSubscriptionRepository.findAll().size();

        // Delete the serviceSubscription
        restServiceSubscriptionMockMvc.perform(delete("/api/service-subscriptions/{id}", serviceSubscription.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceSubscription> serviceSubscriptionList = serviceSubscriptionRepository.findAll();
        assertThat(serviceSubscriptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
