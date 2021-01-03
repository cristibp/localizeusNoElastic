package com.localizeus.core.web.rest;

import com.localizeus.core.service.TranslationKeyService;
import com.localizeus.core.web.rest.errors.BadRequestAlertException;
import com.localizeus.core.service.dto.TranslationKeyDTO;

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
 * REST controller for managing {@link com.localizeus.core.domain.TranslationKey}.
 */
@RestController
@RequestMapping("/api")
public class TranslationKeyResource {

    private final Logger log = LoggerFactory.getLogger(TranslationKeyResource.class);

    private static final String ENTITY_NAME = "translationKey";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TranslationKeyService translationKeyService;

    public TranslationKeyResource(TranslationKeyService translationKeyService) {
        this.translationKeyService = translationKeyService;
    }

    /**
     * {@code POST  /translation-keys} : Create a new translationKey.
     *
     * @param translationKeyDTO the translationKeyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new translationKeyDTO, or with status {@code 400 (Bad Request)} if the translationKey has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/translation-keys")
    public ResponseEntity<TranslationKeyDTO> createTranslationKey(@RequestBody TranslationKeyDTO translationKeyDTO) throws URISyntaxException {
        log.debug("REST request to save TranslationKey : {}", translationKeyDTO);
        if (translationKeyDTO.getId() != null) {
            throw new BadRequestAlertException("A new translationKey cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TranslationKeyDTO result = translationKeyService.save(translationKeyDTO);
        return ResponseEntity.created(new URI("/api/translation-keys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /translation-keys} : Updates an existing translationKey.
     *
     * @param translationKeyDTO the translationKeyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated translationKeyDTO,
     * or with status {@code 400 (Bad Request)} if the translationKeyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the translationKeyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/translation-keys")
    public ResponseEntity<TranslationKeyDTO> updateTranslationKey(@RequestBody TranslationKeyDTO translationKeyDTO) throws URISyntaxException {
        log.debug("REST request to update TranslationKey : {}", translationKeyDTO);
        if (translationKeyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TranslationKeyDTO result = translationKeyService.save(translationKeyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, translationKeyDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /translation-keys} : get all the translationKeys.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of translationKeys in body.
     */
    @GetMapping("/translation-keys")
    public ResponseEntity<List<TranslationKeyDTO>> getAllTranslationKeys(Pageable pageable) {
        log.debug("REST request to get a page of TranslationKeys");
        Page<TranslationKeyDTO> page = translationKeyService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /translation-keys/:id} : get the "id" translationKey.
     *
     * @param id the id of the translationKeyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the translationKeyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/translation-keys/{id}")
    public ResponseEntity<TranslationKeyDTO> getTranslationKey(@PathVariable Long id) {
        log.debug("REST request to get TranslationKey : {}", id);
        Optional<TranslationKeyDTO> translationKeyDTO = translationKeyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(translationKeyDTO);
    }

    /**
     * {@code DELETE  /translation-keys/:id} : delete the "id" translationKey.
     *
     * @param id the id of the translationKeyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/translation-keys/{id}")
    public ResponseEntity<Void> deleteTranslationKey(@PathVariable Long id) {
        log.debug("REST request to delete TranslationKey : {}", id);
        translationKeyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
