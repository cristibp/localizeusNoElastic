package com.localizeus.core.service.impl;

import com.localizeus.core.service.ProjectHistoryService;
import com.localizeus.core.domain.ProjectHistory;
import com.localizeus.core.repository.ProjectHistoryRepository;
import com.localizeus.core.service.dto.ProjectHistoryDTO;
import com.localizeus.core.service.mapper.ProjectHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link ProjectHistory}.
 */
@Service
@Transactional
public class ProjectHistoryServiceImpl implements ProjectHistoryService {

    private final Logger log = LoggerFactory.getLogger(ProjectHistoryServiceImpl.class);

    private final ProjectHistoryRepository projectHistoryRepository;

    private final ProjectHistoryMapper projectHistoryMapper;

    public ProjectHistoryServiceImpl(ProjectHistoryRepository projectHistoryRepository, ProjectHistoryMapper projectHistoryMapper) {
        this.projectHistoryRepository = projectHistoryRepository;
        this.projectHistoryMapper = projectHistoryMapper;
    }

    @Override
    public ProjectHistoryDTO save(ProjectHistoryDTO projectHistoryDTO) {
        log.debug("Request to save ProjectHistory : {}", projectHistoryDTO);
        ProjectHistory projectHistory = projectHistoryMapper.toEntity(projectHistoryDTO);
        projectHistory = projectHistoryRepository.save(projectHistory);
        return projectHistoryMapper.toDto(projectHistory);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProjectHistories");
        return projectHistoryRepository.findAll(pageable)
            .map(projectHistoryMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<ProjectHistoryDTO> findOne(Long id) {
        log.debug("Request to get ProjectHistory : {}", id);
        return projectHistoryRepository.findById(id)
            .map(projectHistoryMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProjectHistory : {}", id);
        projectHistoryRepository.deleteById(id);
    }
}
