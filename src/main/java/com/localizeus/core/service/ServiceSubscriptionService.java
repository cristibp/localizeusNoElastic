package com.localizeus.core.service;

import com.localizeus.core.service.dto.ServiceSubscriptionDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.localizeus.core.domain.ServiceSubscription}.
 */
public interface ServiceSubscriptionService {

    /**
     * Save a serviceSubscription.
     *
     * @param serviceSubscriptionDTO the entity to save.
     * @return the persisted entity.
     */
    ServiceSubscriptionDTO save(ServiceSubscriptionDTO serviceSubscriptionDTO);

    /**
     * Get all the serviceSubscriptions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ServiceSubscriptionDTO> findAll(Pageable pageable);


    /**
     * Get the "id" serviceSubscription.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ServiceSubscriptionDTO> findOne(Long id);

    /**
     * Delete the "id" serviceSubscription.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
