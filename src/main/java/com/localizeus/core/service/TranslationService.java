package com.localizeus.core.service;

import com.localizeus.core.service.dto.TranslationDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.localizeus.core.domain.Translation}.
 */
public interface TranslationService {

    /**
     * Save a translation.
     *
     * @param translationDTO the entity to save.
     * @return the persisted entity.
     */
    TranslationDTO save(TranslationDTO translationDTO);

    /**
     * Get all the translations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TranslationDTO> findAll(Pageable pageable);


    /**
     * Get the "id" translation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TranslationDTO> findOne(Long id);

    /**
     * Delete the "id" translation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
