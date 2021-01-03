package com.localizeus.core.repository;

import com.localizeus.core.domain.ProjectHistory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ProjectHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectHistoryRepository extends JpaRepository<ProjectHistory, Long> {

    @Query("select projectHistory from ProjectHistory projectHistory where projectHistory.refUser.login = ?#{principal.username}")
    List<ProjectHistory> findByRefUserIsCurrentUser();
}
