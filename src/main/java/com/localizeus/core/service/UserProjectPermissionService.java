package com.localizeus.core.service;

import com.localizeus.core.service.dto.UserProjectPermissionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.localizeus.core.domain.UserProjectPermission}.
 */
public interface UserProjectPermissionService {

    /**
     * Save a userProjectPermission.
     *
     * @param userProjectPermissionDTO the entity to save.
     * @return the persisted entity.
     */
    UserProjectPermissionDTO save(UserProjectPermissionDTO userProjectPermissionDTO);

    /**
     * Get all the userProjectPermissions.
     *
     * @return the list of entities.
     */
    List<UserProjectPermissionDTO> findAll();


    /**
     * Get the "id" userProjectPermission.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserProjectPermissionDTO> findOne(Long id);

    /**
     * Delete the "id" userProjectPermission.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
