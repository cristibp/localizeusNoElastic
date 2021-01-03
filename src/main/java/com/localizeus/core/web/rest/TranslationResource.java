package com.localizeus.core.web.rest;

import com.localizeus.core.service.TranslationService;
import com.localizeus.core.web.rest.errors.BadRequestAlertException;
import com.localizeus.core.service.dto.TranslationDTO;

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
 * REST controller for managing {@link com.localizeus.core.domain.Translation}.
 */
@RestController
@RequestMapping("/api")
public class TranslationResource {

    private final Logger log = LoggerFactory.getLogger(TranslationResource.class);

    private static final String ENTITY_NAME = "translation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TranslationService translationService;

    public TranslationResource(TranslationService translationService) {
        this.translationService = translationService;
    }

    /**
     * {@code POST  /translations} : Create a new translation.
     *
     * @param translationDTO the translationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new translationDTO, or with status {@code 400 (Bad Request)} if the translation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/translations")
    public ResponseEntity<TranslationDTO> createTranslation(@RequestBody TranslationDTO translationDTO) throws URISyntaxException {
        log.debug("REST request to save Translation : {}", translationDTO);
        if (translationDTO.getId() != null) {
            throw new BadRequestAlertException("A new translation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TranslationDTO result = translationService.save(translationDTO);
        return ResponseEntity.created(new URI("/api/translations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /translations} : Updates an existing translation.
     *
     * @param translationDTO the translationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated translationDTO,
     * or with status {@code 400 (Bad Request)} if the translationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the translationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/translations")
    public ResponseEntity<TranslationDTO> updateTranslation(@RequestBody TranslationDTO translationDTO) throws URISyntaxException {
        log.debug("REST request to update Translation : {}", translationDTO);
        if (translationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TranslationDTO result = translationService.save(translationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, translationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /translations} : get all the translations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of translations in body.
     */
    @GetMapping("/translations")
    public ResponseEntity<List<TranslationDTO>> getAllTranslations(Pageable pageable) {
        log.debug("REST request to get a page of Translations");
        Page<TranslationDTO> page = translationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /translations/:id} : get the "id" translation.
     *
     * @param id the id of the translationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the translationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/translations/{id}")
    public ResponseEntity<TranslationDTO> getTranslation(@PathVariable Long id) {
        log.debug("REST request to get Translation : {}", id);
        Optional<TranslationDTO> translationDTO = translationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(translationDTO);
    }

    /**
     * {@code DELETE  /translations/:id} : delete the "id" translation.
     *
     * @param id the id of the translationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/translations/{id}")
    public ResponseEntity<Void> deleteTranslation(@PathVariable Long id) {
        log.debug("REST request to delete Translation : {}", id);
        translationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
