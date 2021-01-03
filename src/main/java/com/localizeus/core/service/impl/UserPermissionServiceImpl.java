package com.localizeus.core.service.impl;

import com.localizeus.core.service.UserPermissionService;
import com.localizeus.core.domain.UserPermission;
import com.localizeus.core.repository.UserPermissionRepository;
import com.localizeus.core.service.dto.UserPermissionDTO;
import com.localizeus.core.service.mapper.UserPermissionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link UserPermission}.
 */
@Service
@Transactional
public class UserPermissionServiceImpl implements UserPermissionService {

    private final Logger log = LoggerFactory.getLogger(UserPermissionServiceImpl.class);

    private final UserPermissionRepository userPermissionRepository;

    private final UserPermissionMapper userPermissionMapper;

    public UserPermissionServiceImpl(UserPermissionRepository userPermissionRepository, UserPermissionMapper userPermissionMapper) {
        this.userPermissionRepository = userPermissionRepository;
        this.userPermissionMapper = userPermissionMapper;
    }

    @Override
    public UserPermissionDTO save(UserPermissionDTO userPermissionDTO) {
        log.debug("Request to save UserPermission : {}", userPermissionDTO);
        UserPermission userPermission = userPermissionMapper.toEntity(userPermissionDTO);
        userPermission = userPermissionRepository.save(userPermission);
        return userPermissionMapper.toDto(userPermission);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserPermissionDTO> findAll() {
        log.debug("Request to get all UserPermissions");
        return userPermissionRepository.findAll().stream()
            .map(userPermissionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<UserPermissionDTO> findOne(Long id) {
        log.debug("Request to get UserPermission : {}", id);
        return userPermissionRepository.findById(id)
            .map(userPermissionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserPermission : {}", id);
        userPermissionRepository.deleteById(id);
    }
}
