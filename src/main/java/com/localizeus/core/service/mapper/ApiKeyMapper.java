package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.ApiKeyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ApiKey} and its DTO {@link ApiKeyDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ApiKeyMapper extends EntityMapper<ApiKeyDTO, ApiKey> {

    @Mapping(source = "refUser.id", target = "refUserId")
    ApiKeyDTO toDto(ApiKey apiKey);

    @Mapping(source = "refUserId", target = "refUser")
    ApiKey toEntity(ApiKeyDTO apiKeyDTO);

    default ApiKey fromId(Long id) {
        if (id == null) {
            return null;
        }
        ApiKey apiKey = new ApiKey();
        apiKey.setId(id);
        return apiKey;
    }
}
