package com.localizeus.core.service.dto;

import java.io.Serializable;
import com.localizeus.core.domain.enumeration.PermissionType;

/**
 * A DTO for the {@link com.localizeus.core.domain.UserPermission} entity.
 */
public class UserPermissionDTO implements Serializable {
    
    private Long id;

    private PermissionType type;


    private Long refUserId;

    private Long refProjectId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PermissionType getType() {
        return type;
    }

    public void setType(PermissionType type) {
        this.type = type;
    }

    public Long getRefUserId() {
        return refUserId;
    }

    public void setRefUserId(Long userId) {
        this.refUserId = userId;
    }

    public Long getRefProjectId() {
        return refProjectId;
    }

    public void setRefProjectId(Long projectId) {
        this.refProjectId = projectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserPermissionDTO)) {
            return false;
        }

        return id != null && id.equals(((UserPermissionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserPermissionDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", refUserId=" + getRefUserId() +
            ", refProjectId=" + getRefProjectId() +
            "}";
    }
}
