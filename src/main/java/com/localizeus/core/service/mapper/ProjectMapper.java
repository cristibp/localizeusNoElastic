package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.ProjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Project} and its DTO {@link ProjectDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProjectMapper extends EntityMapper<ProjectDTO, Project> {



    default Project fromId(Long id) {
        if (id == null) {
            return null;
        }
        Project project = new Project();
        project.setId(id);
        return project;
    }
}
