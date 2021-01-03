package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.UserProjectPermissionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserProjectPermission} and its DTO {@link UserProjectPermissionDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, ProjectMapper.class, UserPermissionMapper.class})
public interface UserProjectPermissionMapper extends EntityMapper<UserProjectPermissionDTO, UserProjectPermission> {

    @Mapping(source = "refUser.id", target = "refUserId")
    @Mapping(source = "refProject.id", target = "refProjectId")
    @Mapping(source = "refUserPermission.id", target = "refUserPermissionId")
    UserProjectPermissionDTO toDto(UserProjectPermission userProjectPermission);

    @Mapping(source = "refUserId", target = "refUser")
    @Mapping(source = "refProjectId", target = "refProject")
    @Mapping(source = "refUserPermissionId", target = "refUserPermission")
    UserProjectPermission toEntity(UserProjectPermissionDTO userProjectPermissionDTO);

    default UserProjectPermission fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserProjectPermission userProjectPermission = new UserProjectPermission();
        userProjectPermission.setId(id);
        return userProjectPermission;
    }
}
