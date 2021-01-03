package com.localizeus.core.repository;

import com.localizeus.core.domain.KeyLabel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the KeyLabel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeyLabelRepository extends JpaRepository<KeyLabel, Long> {
}
