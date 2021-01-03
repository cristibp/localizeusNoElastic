package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.DiscussionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Discussion} and its DTO {@link DiscussionDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProjectMapper.class})
public interface DiscussionMapper extends EntityMapper<DiscussionDTO, Discussion> {

    @Mapping(source = "refProject.id", target = "refProjectId")
    DiscussionDTO toDto(Discussion discussion);

    @Mapping(source = "refProjectId", target = "refProject")
    Discussion toEntity(DiscussionDTO discussionDTO);

    default Discussion fromId(Long id) {
        if (id == null) {
            return null;
        }
        Discussion discussion = new Discussion();
        discussion.setId(id);
        return discussion;
    }
}
