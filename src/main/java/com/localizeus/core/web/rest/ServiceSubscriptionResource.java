package com.localizeus.core.web.rest;

import com.localizeus.core.service.ServiceSubscriptionService;
import com.localizeus.core.web.rest.errors.BadRequestAlertException;
import com.localizeus.core.service.dto.ServiceSubscriptionDTO;

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
 * REST controller for managing {@link com.localizeus.core.domain.ServiceSubscription}.
 */
@RestController
@RequestMapping("/api")
public class ServiceSubscriptionResource {

    private final Logger log = LoggerFactory.getLogger(ServiceSubscriptionResource.class);

    private static final String ENTITY_NAME = "serviceSubscription";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceSubscriptionService serviceSubscriptionService;

    public ServiceSubscriptionResource(ServiceSubscriptionService serviceSubscriptionService) {
        this.serviceSubscriptionService = serviceSubscriptionService;
    }

    /**
     * {@code POST  /service-subscriptions} : Create a new serviceSubscription.
     *
     * @param serviceSubscriptionDTO the serviceSubscriptionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceSubscriptionDTO, or with status {@code 400 (Bad Request)} if the serviceSubscription has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-subscriptions")
    public ResponseEntity<ServiceSubscriptionDTO> createServiceSubscription(@RequestBody ServiceSubscriptionDTO serviceSubscriptionDTO) throws URISyntaxException {
        log.debug("REST request to save ServiceSubscription : {}", serviceSubscriptionDTO);
        if (serviceSubscriptionDTO.getId() != null) {
            throw new BadRequestAlertException("A new serviceSubscription cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceSubscriptionDTO result = serviceSubscriptionService.save(serviceSubscriptionDTO);
        return ResponseEntity.created(new URI("/api/service-subscriptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-subscriptions} : Updates an existing serviceSubscription.
     *
     * @param serviceSubscriptionDTO the serviceSubscriptionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceSubscriptionDTO,
     * or with status {@code 400 (Bad Request)} if the serviceSubscriptionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceSubscriptionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-subscriptions")
    public ResponseEntity<ServiceSubscriptionDTO> updateServiceSubscription(@RequestBody ServiceSubscriptionDTO serviceSubscriptionDTO) throws URISyntaxException {
        log.debug("REST request to update ServiceSubscription : {}", serviceSubscriptionDTO);
        if (serviceSubscriptionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceSubscriptionDTO result = serviceSubscriptionService.save(serviceSubscriptionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceSubscriptionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /service-subscriptions} : get all the serviceSubscriptions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceSubscriptions in body.
     */
    @GetMapping("/service-subscriptions")
    public ResponseEntity<List<ServiceSubscriptionDTO>> getAllServiceSubscriptions(Pageable pageable) {
        log.debug("REST request to get a page of ServiceSubscriptions");
        Page<ServiceSubscriptionDTO> page = serviceSubscriptionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /service-subscriptions/:id} : get the "id" serviceSubscription.
     *
     * @param id the id of the serviceSubscriptionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceSubscriptionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-subscriptions/{id}")
    public ResponseEntity<ServiceSubscriptionDTO> getServiceSubscription(@PathVariable Long id) {
        log.debug("REST request to get ServiceSubscription : {}", id);
        Optional<ServiceSubscriptionDTO> serviceSubscriptionDTO = serviceSubscriptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(serviceSubscriptionDTO);
    }

    /**
     * {@code DELETE  /service-subscriptions/:id} : delete the "id" serviceSubscription.
     *
     * @param id the id of the serviceSubscriptionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-subscriptions/{id}")
    public ResponseEntity<Void> deleteServiceSubscription(@PathVariable Long id) {
        log.debug("REST request to delete ServiceSubscription : {}", id);
        serviceSubscriptionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
