package com.localizeus.core.service;

import com.localizeus.core.service.dto.KeyLabelDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.localizeus.core.domain.KeyLabel}.
 */
public interface KeyLabelService {

    /**
     * Save a keyLabel.
     *
     * @param keyLabelDTO the entity to save.
     * @return the persisted entity.
     */
    KeyLabelDTO save(KeyLabelDTO keyLabelDTO);

    /**
     * Get all the keyLabels.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<KeyLabelDTO> findAll(Pageable pageable);


    /**
     * Get the "id" keyLabel.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<KeyLabelDTO> findOne(Long id);

    /**
     * Delete the "id" keyLabel.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
