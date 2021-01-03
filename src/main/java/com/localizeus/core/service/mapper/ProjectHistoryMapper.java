package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.ProjectHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProjectHistory} and its DTO {@link ProjectHistoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TranslationKeyMapper.class, TranslationMapper.class})
public interface ProjectHistoryMapper extends EntityMapper<ProjectHistoryDTO, ProjectHistory> {

    @Mapping(source = "refUser.id", target = "refUserId")
    @Mapping(source = "refTranslationKey.id", target = "refTranslationKeyId")
    @Mapping(source = "refTranslation.id", target = "refTranslationId")
    ProjectHistoryDTO toDto(ProjectHistory projectHistory);

    @Mapping(source = "refUserId", target = "refUser")
    @Mapping(source = "refTranslationKeyId", target = "refTranslationKey")
    @Mapping(source = "refTranslationId", target = "refTranslation")
    ProjectHistory toEntity(ProjectHistoryDTO projectHistoryDTO);

    default ProjectHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProjectHistory projectHistory = new ProjectHistory();
        projectHistory.setId(id);
        return projectHistory;
    }
}
