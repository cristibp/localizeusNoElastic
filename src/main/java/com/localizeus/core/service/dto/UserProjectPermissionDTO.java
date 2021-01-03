package com.localizeus.core.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.localizeus.core.domain.UserProjectPermission} entity.
 */
public class UserProjectPermissionDTO implements Serializable {
    
    private Long id;


    private Long refUserId;

    private Long refProjectId;

    private Long refUserPermissionId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getRefUserPermissionId() {
        return refUserPermissionId;
    }

    public void setRefUserPermissionId(Long userPermissionId) {
        this.refUserPermissionId = userPermissionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProjectPermissionDTO)) {
            return false;
        }

        return id != null && id.equals(((UserProjectPermissionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProjectPermissionDTO{" +
            "id=" + getId() +
            ", refUserId=" + getRefUserId() +
            ", refProjectId=" + getRefProjectId() +
            ", refUserPermissionId=" + getRefUserPermissionId() +
            "}";
    }
}
