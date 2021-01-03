package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.ServiceSubscriptionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ServiceSubscription} and its DTO {@link ServiceSubscriptionDTO}.
 */
@Mapper(componentModel = "spring", uses = {CompanyMapper.class, PlanMapper.class})
public interface ServiceSubscriptionMapper extends EntityMapper<ServiceSubscriptionDTO, ServiceSubscription> {

    @Mapping(source = "refCompany.id", target = "refCompanyId")
    @Mapping(source = "refPlan.id", target = "refPlanId")
    ServiceSubscriptionDTO toDto(ServiceSubscription serviceSubscription);

    @Mapping(source = "refCompanyId", target = "refCompany")
    @Mapping(source = "refPlanId", target = "refPlan")
    ServiceSubscription toEntity(ServiceSubscriptionDTO serviceSubscriptionDTO);

    default ServiceSubscription fromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceSubscription serviceSubscription = new ServiceSubscription();
        serviceSubscription.setId(id);
        return serviceSubscription;
    }
}
