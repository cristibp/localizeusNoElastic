package com.localizeus.core.service.impl;

import com.localizeus.core.service.UserProjectPermissionService;
import com.localizeus.core.domain.UserProjectPermission;
import com.localizeus.core.repository.UserProjectPermissionRepository;
import com.localizeus.core.service.dto.UserProjectPermissionDTO;
import com.localizeus.core.service.mapper.UserProjectPermissionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link UserProjectPermission}.
 */
@Service
@Transactional
public class UserProjectPermissionServiceImpl implements UserProjectPermissionService {

    private final Logger log = LoggerFactory.getLogger(UserProjectPermissionServiceImpl.class);

    private final UserProjectPermissionRepository userProjectPermissionRepository;

    private final UserProjectPermissionMapper userProjectPermissionMapper;

    public UserProjectPermissionServiceImpl(UserProjectPermissionRepository userProjectPermissionRepository, UserProjectPermissionMapper userProjectPermissionMapper) {
        this.userProjectPermissionRepository = userProjectPermissionRepository;
        this.userProjectPermissionMapper = userProjectPermissionMapper;
    }

    @Override
    public UserProjectPermissionDTO save(UserProjectPermissionDTO userProjectPermissionDTO) {
        log.debug("Request to save UserProjectPermission : {}", userProjectPermissionDTO);
        UserProjectPermission userProjectPermission = userProjectPermissionMapper.toEntity(userProjectPermissionDTO);
        userProjectPermission = userProjectPermissionRepository.save(userProjectPermission);
        return userProjectPermissionMapper.toDto(userProjectPermission);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserProjectPermissionDTO> findAll() {
        log.debug("Request to get all UserProjectPermissions");
        return userProjectPermissionRepository.findAll().stream()
            .map(userProjectPermissionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<UserProjectPermissionDTO> findOne(Long id) {
        log.debug("Request to get UserProjectPermission : {}", id);
        return userProjectPermissionRepository.findById(id)
            .map(userProjectPermissionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserProjectPermission : {}", id);
        userProjectPermissionRepository.deleteById(id);
    }
}
