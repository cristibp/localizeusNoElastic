package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.UserPermissionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserPermission} and its DTO {@link UserPermissionDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, ProjectMapper.class})
public interface UserPermissionMapper extends EntityMapper<UserPermissionDTO, UserPermission> {

    @Mapping(source = "refUser.id", target = "refUserId")
    @Mapping(source = "refProject.id", target = "refProjectId")
    UserPermissionDTO toDto(UserPermission userPermission);

    @Mapping(source = "refUserId", target = "refUser")
    @Mapping(source = "refProjectId", target = "refProject")
    UserPermission toEntity(UserPermissionDTO userPermissionDTO);

    default UserPermission fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserPermission userPermission = new UserPermission();
        userPermission.setId(id);
        return userPermission;
    }
}
