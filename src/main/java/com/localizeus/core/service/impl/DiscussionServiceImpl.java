package com.localizeus.core.service.impl;

import com.localizeus.core.service.DiscussionService;
import com.localizeus.core.domain.Discussion;
import com.localizeus.core.repository.DiscussionRepository;
import com.localizeus.core.service.dto.DiscussionDTO;
import com.localizeus.core.service.mapper.DiscussionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Discussion}.
 */
@Service
@Transactional
public class DiscussionServiceImpl implements DiscussionService {

    private final Logger log = LoggerFactory.getLogger(DiscussionServiceImpl.class);

    private final DiscussionRepository discussionRepository;

    private final DiscussionMapper discussionMapper;

    public DiscussionServiceImpl(DiscussionRepository discussionRepository, DiscussionMapper discussionMapper) {
        this.discussionRepository = discussionRepository;
        this.discussionMapper = discussionMapper;
    }

    @Override
    public DiscussionDTO save(DiscussionDTO discussionDTO) {
        log.debug("Request to save Discussion : {}", discussionDTO);
        Discussion discussion = discussionMapper.toEntity(discussionDTO);
        discussion = discussionRepository.save(discussion);
        return discussionMapper.toDto(discussion);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DiscussionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Discussions");
        return discussionRepository.findAll(pageable)
            .map(discussionMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<DiscussionDTO> findOne(Long id) {
        log.debug("Request to get Discussion : {}", id);
        return discussionRepository.findById(id)
            .map(discussionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Discussion : {}", id);
        discussionRepository.deleteById(id);
    }
}
