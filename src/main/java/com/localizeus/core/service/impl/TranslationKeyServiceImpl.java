package com.localizeus.core.service.impl;

import com.localizeus.core.service.TranslationKeyService;
import com.localizeus.core.domain.TranslationKey;
import com.localizeus.core.repository.TranslationKeyRepository;
import com.localizeus.core.service.dto.TranslationKeyDTO;
import com.localizeus.core.service.mapper.TranslationKeyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TranslationKey}.
 */
@Service
@Transactional
public class TranslationKeyServiceImpl implements TranslationKeyService {

    private final Logger log = LoggerFactory.getLogger(TranslationKeyServiceImpl.class);

    private final TranslationKeyRepository translationKeyRepository;

    private final TranslationKeyMapper translationKeyMapper;

    public TranslationKeyServiceImpl(TranslationKeyRepository translationKeyRepository, TranslationKeyMapper translationKeyMapper) {
        this.translationKeyRepository = translationKeyRepository;
        this.translationKeyMapper = translationKeyMapper;
    }

    @Override
    public TranslationKeyDTO save(TranslationKeyDTO translationKeyDTO) {
        log.debug("Request to save TranslationKey : {}", translationKeyDTO);
        TranslationKey translationKey = translationKeyMapper.toEntity(translationKeyDTO);
        translationKey = translationKeyRepository.save(translationKey);
        return translationKeyMapper.toDto(translationKey);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TranslationKeyDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TranslationKeys");
        return translationKeyRepository.findAll(pageable)
            .map(translationKeyMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<TranslationKeyDTO> findOne(Long id) {
        log.debug("Request to get TranslationKey : {}", id);
        return translationKeyRepository.findById(id)
            .map(translationKeyMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TranslationKey : {}", id);
        translationKeyRepository.deleteById(id);
    }
}
