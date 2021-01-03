package com.localizeus.core.web.rest;

import com.localizeus.core.service.UserProjectPermissionService;
import com.localizeus.core.web.rest.errors.BadRequestAlertException;
import com.localizeus.core.service.dto.UserProjectPermissionDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.localizeus.core.domain.UserProjectPermission}.
 */
@RestController
@RequestMapping("/api")
public class UserProjectPermissionResource {

    private final Logger log = LoggerFactory.getLogger(UserProjectPermissionResource.class);

    private static final String ENTITY_NAME = "userProjectPermission";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserProjectPermissionService userProjectPermissionService;

    public UserProjectPermissionResource(UserProjectPermissionService userProjectPermissionService) {
        this.userProjectPermissionService = userProjectPermissionService;
    }

    /**
     * {@code POST  /user-project-permissions} : Create a new userProjectPermission.
     *
     * @param userProjectPermissionDTO the userProjectPermissionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userProjectPermissionDTO, or with status {@code 400 (Bad Request)} if the userProjectPermission has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-project-permissions")
    public ResponseEntity<UserProjectPermissionDTO> createUserProjectPermission(@RequestBody UserProjectPermissionDTO userProjectPermissionDTO) throws URISyntaxException {
        log.debug("REST request to save UserProjectPermission : {}", userProjectPermissionDTO);
        if (userProjectPermissionDTO.getId() != null) {
            throw new BadRequestAlertException("A new userProjectPermission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserProjectPermissionDTO result = userProjectPermissionService.save(userProjectPermissionDTO);
        return ResponseEntity.created(new URI("/api/user-project-permissions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-project-permissions} : Updates an existing userProjectPermission.
     *
     * @param userProjectPermissionDTO the userProjectPermissionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userProjectPermissionDTO,
     * or with status {@code 400 (Bad Request)} if the userProjectPermissionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userProjectPermissionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-project-permissions")
    public ResponseEntity<UserProjectPermissionDTO> updateUserProjectPermission(@RequestBody UserProjectPermissionDTO userProjectPermissionDTO) throws URISyntaxException {
        log.debug("REST request to update UserProjectPermission : {}", userProjectPermissionDTO);
        if (userProjectPermissionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserProjectPermissionDTO result = userProjectPermissionService.save(userProjectPermissionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userProjectPermissionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-project-permissions} : get all the userProjectPermissions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userProjectPermissions in body.
     */
    @GetMapping("/user-project-permissions")
    public List<UserProjectPermissionDTO> getAllUserProjectPermissions() {
        log.debug("REST request to get all UserProjectPermissions");
        return userProjectPermissionService.findAll();
    }

    /**
     * {@code GET  /user-project-permissions/:id} : get the "id" userProjectPermission.
     *
     * @param id the id of the userProjectPermissionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userProjectPermissionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-project-permissions/{id}")
    public ResponseEntity<UserProjectPermissionDTO> getUserProjectPermission(@PathVariable Long id) {
        log.debug("REST request to get UserProjectPermission : {}", id);
        Optional<UserProjectPermissionDTO> userProjectPermissionDTO = userProjectPermissionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userProjectPermissionDTO);
    }

    /**
     * {@code DELETE  /user-project-permissions/:id} : delete the "id" userProjectPermission.
     *
     * @param id the id of the userProjectPermissionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-project-permissions/{id}")
    public ResponseEntity<Void> deleteUserProjectPermission(@PathVariable Long id) {
        log.debug("REST request to delete UserProjectPermission : {}", id);
        userProjectPermissionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
