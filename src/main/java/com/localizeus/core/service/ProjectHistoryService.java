package com.localizeus.core.service;

import com.localizeus.core.service.dto.ProjectHistoryDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.localizeus.core.domain.ProjectHistory}.
 */
public interface ProjectHistoryService {

    /**
     * Save a projectHistory.
     *
     * @param projectHistoryDTO the entity to save.
     * @return the persisted entity.
     */
    ProjectHistoryDTO save(ProjectHistoryDTO projectHistoryDTO);

    /**
     * Get all the projectHistories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProjectHistoryDTO> findAll(Pageable pageable);


    /**
     * Get the "id" projectHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProjectHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" projectHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
