package com.localizeus.core.web.rest;

import com.localizeus.core.service.KeyLabelService;
import com.localizeus.core.web.rest.errors.BadRequestAlertException;
import com.localizeus.core.service.dto.KeyLabelDTO;

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
 * REST controller for managing {@link com.localizeus.core.domain.KeyLabel}.
 */
@RestController
@RequestMapping("/api")
public class KeyLabelResource {

    private final Logger log = LoggerFactory.getLogger(KeyLabelResource.class);

    private static final String ENTITY_NAME = "keyLabel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final KeyLabelService keyLabelService;

    public KeyLabelResource(KeyLabelService keyLabelService) {
        this.keyLabelService = keyLabelService;
    }

    /**
     * {@code POST  /key-labels} : Create a new keyLabel.
     *
     * @param keyLabelDTO the keyLabelDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new keyLabelDTO, or with status {@code 400 (Bad Request)} if the keyLabel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/key-labels")
    public ResponseEntity<KeyLabelDTO> createKeyLabel(@RequestBody KeyLabelDTO keyLabelDTO) throws URISyntaxException {
        log.debug("REST request to save KeyLabel : {}", keyLabelDTO);
        if (keyLabelDTO.getId() != null) {
            throw new BadRequestAlertException("A new keyLabel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KeyLabelDTO result = keyLabelService.save(keyLabelDTO);
        return ResponseEntity.created(new URI("/api/key-labels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /key-labels} : Updates an existing keyLabel.
     *
     * @param keyLabelDTO the keyLabelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated keyLabelDTO,
     * or with status {@code 400 (Bad Request)} if the keyLabelDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the keyLabelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/key-labels")
    public ResponseEntity<KeyLabelDTO> updateKeyLabel(@RequestBody KeyLabelDTO keyLabelDTO) throws URISyntaxException {
        log.debug("REST request to update KeyLabel : {}", keyLabelDTO);
        if (keyLabelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        KeyLabelDTO result = keyLabelService.save(keyLabelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, keyLabelDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /key-labels} : get all the keyLabels.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of keyLabels in body.
     */
    @GetMapping("/key-labels")
    public ResponseEntity<List<KeyLabelDTO>> getAllKeyLabels(Pageable pageable) {
        log.debug("REST request to get a page of KeyLabels");
        Page<KeyLabelDTO> page = keyLabelService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /key-labels/:id} : get the "id" keyLabel.
     *
     * @param id the id of the keyLabelDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the keyLabelDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/key-labels/{id}")
    public ResponseEntity<KeyLabelDTO> getKeyLabel(@PathVariable Long id) {
        log.debug("REST request to get KeyLabel : {}", id);
        Optional<KeyLabelDTO> keyLabelDTO = keyLabelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(keyLabelDTO);
    }

    /**
     * {@code DELETE  /key-labels/:id} : delete the "id" keyLabel.
     *
     * @param id the id of the keyLabelDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/key-labels/{id}")
    public ResponseEntity<Void> deleteKeyLabel(@PathVariable Long id) {
        log.debug("REST request to delete KeyLabel : {}", id);
        keyLabelService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
