package com.localizeus.core.service;

import com.localizeus.core.service.dto.UserPermissionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.localizeus.core.domain.UserPermission}.
 */
public interface UserPermissionService {

    /**
     * Save a userPermission.
     *
     * @param userPermissionDTO the entity to save.
     * @return the persisted entity.
     */
    UserPermissionDTO save(UserPermissionDTO userPermissionDTO);

    /**
     * Get all the userPermissions.
     *
     * @return the list of entities.
     */
    List<UserPermissionDTO> findAll();


    /**
     * Get the "id" userPermission.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserPermissionDTO> findOne(Long id);

    /**
     * Delete the "id" userPermission.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
