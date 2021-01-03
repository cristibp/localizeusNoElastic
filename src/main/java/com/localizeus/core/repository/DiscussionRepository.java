package com.localizeus.core.repository;

import com.localizeus.core.domain.Discussion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Discussion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
}
