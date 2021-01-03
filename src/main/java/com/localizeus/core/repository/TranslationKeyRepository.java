package com.localizeus.core.repository;

import com.localizeus.core.domain.TranslationKey;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TranslationKey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TranslationKeyRepository extends JpaRepository<TranslationKey, Long> {
}
