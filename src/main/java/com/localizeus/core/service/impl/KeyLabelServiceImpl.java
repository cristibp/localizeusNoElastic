package com.localizeus.core.service.impl;

import com.localizeus.core.service.KeyLabelService;
import com.localizeus.core.domain.KeyLabel;
import com.localizeus.core.repository.KeyLabelRepository;
import com.localizeus.core.service.dto.KeyLabelDTO;
import com.localizeus.core.service.mapper.KeyLabelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link KeyLabel}.
 */
@Service
@Transactional
public class KeyLabelServiceImpl implements KeyLabelService {

    private final Logger log = LoggerFactory.getLogger(KeyLabelServiceImpl.class);

    private final KeyLabelRepository keyLabelRepository;

    private final KeyLabelMapper keyLabelMapper;

    public KeyLabelServiceImpl(KeyLabelRepository keyLabelRepository, KeyLabelMapper keyLabelMapper) {
        this.keyLabelRepository = keyLabelRepository;
        this.keyLabelMapper = keyLabelMapper;
    }

    @Override
    public KeyLabelDTO save(KeyLabelDTO keyLabelDTO) {
        log.debug("Request to save KeyLabel : {}", keyLabelDTO);
        KeyLabel keyLabel = keyLabelMapper.toEntity(keyLabelDTO);
        keyLabel = keyLabelRepository.save(keyLabel);
        return keyLabelMapper.toDto(keyLabel);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<KeyLabelDTO> findAll(Pageable pageable) {
        log.debug("Request to get all KeyLabels");
        return keyLabelRepository.findAll(pageable)
            .map(keyLabelMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<KeyLabelDTO> findOne(Long id) {
        log.debug("Request to get KeyLabel : {}", id);
        return keyLabelRepository.findById(id)
            .map(keyLabelMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete KeyLabel : {}", id);
        keyLabelRepository.deleteById(id);
    }
}
