package com.localizeus.core.service;

import com.localizeus.core.service.dto.ApiKeyDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.localizeus.core.domain.ApiKey}.
 */
public interface ApiKeyService {

    /**
     * Save a apiKey.
     *
     * @param apiKeyDTO the entity to save.
     * @return the persisted entity.
     */
    ApiKeyDTO save(ApiKeyDTO apiKeyDTO);

    /**
     * Get all the apiKeys.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ApiKeyDTO> findAll(Pageable pageable);


    /**
     * Get the "id" apiKey.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ApiKeyDTO> findOne(Long id);

    /**
     * Delete the "id" apiKey.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
