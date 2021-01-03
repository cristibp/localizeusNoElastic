package com.localizeus.core.repository;

import com.localizeus.core.domain.UserPermission;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserPermission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPermissionRepository extends JpaRepository<UserPermission, Long> {

    @Query("select userPermission from UserPermission userPermission where userPermission.refUser.login = ?#{principal.username}")
    List<UserPermission> findByRefUserIsCurrentUser();
}
