package com.localizeus.core.service.impl;

import com.localizeus.core.service.ApiKeyService;
import com.localizeus.core.domain.ApiKey;
import com.localizeus.core.repository.ApiKeyRepository;
import com.localizeus.core.service.dto.ApiKeyDTO;
import com.localizeus.core.service.mapper.ApiKeyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ApiKey}.
 */
@Service
@Transactional
public class ApiKeyServiceImpl implements ApiKeyService {

    private final Logger log = LoggerFactory.getLogger(ApiKeyServiceImpl.class);

    private final ApiKeyRepository apiKeyRepository;

    private final ApiKeyMapper apiKeyMapper;

    public ApiKeyServiceImpl(ApiKeyRepository apiKeyRepository, ApiKeyMapper apiKeyMapper) {
        this.apiKeyRepository = apiKeyRepository;
        this.apiKeyMapper = apiKeyMapper;
    }

    @Override
    public ApiKeyDTO save(ApiKeyDTO apiKeyDTO) {
        log.debug("Request to save ApiKey : {}", apiKeyDTO);
        ApiKey apiKey = apiKeyMapper.toEntity(apiKeyDTO);
        apiKey = apiKeyRepository.save(apiKey);
        return apiKeyMapper.toDto(apiKey);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ApiKeyDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ApiKeys");
        return apiKeyRepository.findAll(pageable)
            .map(apiKeyMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<ApiKeyDTO> findOne(Long id) {
        log.debug("Request to get ApiKey : {}", id);
        return apiKeyRepository.findById(id)
            .map(apiKeyMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ApiKey : {}", id);
        apiKeyRepository.deleteById(id);
    }
}
