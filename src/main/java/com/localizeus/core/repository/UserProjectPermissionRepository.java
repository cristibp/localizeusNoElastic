package com.localizeus.core.repository;

import com.localizeus.core.domain.UserProjectPermission;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserProjectPermission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserProjectPermissionRepository extends JpaRepository<UserProjectPermission, Long> {

    @Query("select userProjectPermission from UserProjectPermission userProjectPermission where userProjectPermission.refUser.login = ?#{principal.username}")
    List<UserProjectPermission> findByRefUserIsCurrentUser();
}
