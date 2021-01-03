package com.localizeus.core.web.rest;

import com.localizeus.core.service.ProjectHistoryService;
import com.localizeus.core.web.rest.errors.BadRequestAlertException;
import com.localizeus.core.service.dto.ProjectHistoryDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.localizeus.core.domain.ProjectHistory}.
 */
@RestController
@RequestMapping("/api")
public class ProjectHistoryResource {

    private final Logger log = LoggerFactory.getLogger(ProjectHistoryResource.class);

    private static final String ENTITY_NAME = "projectHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProjectHistoryService projectHistoryService;

    public ProjectHistoryResource(ProjectHistoryService projectHistoryService) {
        this.projectHistoryService = projectHistoryService;
    }

    /**
     * {@code POST  /project-histories} : Create a new projectHistory.
     *
     * @param projectHistoryDTO the projectHistoryDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projectHistoryDTO, or with status {@code 400 (Bad Request)} if the projectHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/project-histories")
    public ResponseEntity<ProjectHistoryDTO> createProjectHistory(@RequestBody ProjectHistoryDTO projectHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save ProjectHistory : {}", projectHistoryDTO);
        if (projectHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new projectHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProjectHistoryDTO result = projectHistoryService.save(projectHistoryDTO);
        return ResponseEntity.created(new URI("/api/project-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /project-histories} : Updates an existing projectHistory.
     *
     * @param projectHistoryDTO the projectHistoryDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectHistoryDTO,
     * or with status {@code 400 (Bad Request)} if the projectHistoryDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projectHistoryDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/project-histories")
    public ResponseEntity<ProjectHistoryDTO> updateProjectHistory(@RequestBody ProjectHistoryDTO projectHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update ProjectHistory : {}", projectHistoryDTO);
        if (projectHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProjectHistoryDTO result = projectHistoryService.save(projectHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /project-histories} : get all the projectHistories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of projectHistories in body.
     */
    @GetMapping("/project-histories")
    public ResponseEntity<List<ProjectHistoryDTO>> getAllProjectHistories(Pageable pageable) {
        log.debug("REST request to get a page of ProjectHistories");
        Page<ProjectHistoryDTO> page = projectHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /project-histories/:id} : get the "id" projectHistory.
     *
     * @param id the id of the projectHistoryDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projectHistoryDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/project-histories/{id}")
    public ResponseEntity<ProjectHistoryDTO> getProjectHistory(@PathVariable Long id) {
        log.debug("REST request to get ProjectHistory : {}", id);
        Optional<ProjectHistoryDTO> projectHistoryDTO = projectHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(projectHistoryDTO);
    }

    /**
     * {@code DELETE  /project-histories/:id} : delete the "id" projectHistory.
     *
     * @param id the id of the projectHistoryDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/project-histories/{id}")
    public ResponseEntity<Void> deleteProjectHistory(@PathVariable Long id) {
        log.debug("REST request to delete ProjectHistory : {}", id);
        projectHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
