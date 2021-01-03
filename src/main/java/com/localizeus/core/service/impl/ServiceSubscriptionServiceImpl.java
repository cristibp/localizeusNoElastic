package com.localizeus.core.service.impl;

import com.localizeus.core.service.ServiceSubscriptionService;
import com.localizeus.core.domain.ServiceSubscription;
import com.localizeus.core.repository.ServiceSubscriptionRepository;
import com.localizeus.core.service.dto.ServiceSubscriptionDTO;
import com.localizeus.core.service.mapper.ServiceSubscriptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ServiceSubscription}.
 */
@Service
@Transactional
public class ServiceSubscriptionServiceImpl implements ServiceSubscriptionService {

    private final Logger log = LoggerFactory.getLogger(ServiceSubscriptionServiceImpl.class);

    private final ServiceSubscriptionRepository serviceSubscriptionRepository;

    private final ServiceSubscriptionMapper serviceSubscriptionMapper;

    public ServiceSubscriptionServiceImpl(ServiceSubscriptionRepository serviceSubscriptionRepository, ServiceSubscriptionMapper serviceSubscriptionMapper) {
        this.serviceSubscriptionRepository = serviceSubscriptionRepository;
        this.serviceSubscriptionMapper = serviceSubscriptionMapper;
    }

    @Override
    public ServiceSubscriptionDTO save(ServiceSubscriptionDTO serviceSubscriptionDTO) {
        log.debug("Request to save ServiceSubscription : {}", serviceSubscriptionDTO);
        ServiceSubscription serviceSubscription = serviceSubscriptionMapper.toEntity(serviceSubscriptionDTO);
        serviceSubscription = serviceSubscriptionRepository.save(serviceSubscription);
        return serviceSubscriptionMapper.toDto(serviceSubscription);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ServiceSubscriptionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ServiceSubscriptions");
        return serviceSubscriptionRepository.findAll(pageable)
            .map(serviceSubscriptionMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<ServiceSubscriptionDTO> findOne(Long id) {
        log.debug("Request to get ServiceSubscription : {}", id);
        return serviceSubscriptionRepository.findById(id)
            .map(serviceSubscriptionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ServiceSubscription : {}", id);
        serviceSubscriptionRepository.deleteById(id);
    }
}
