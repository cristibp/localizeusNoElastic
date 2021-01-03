package com.localizeus.core.repository;

import com.localizeus.core.domain.ServiceSubscription;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ServiceSubscription entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceSubscriptionRepository extends JpaRepository<ServiceSubscription, Long> {
}
