package com.localizeus.core.service.dto;

import java.io.Serializable;
import com.localizeus.core.domain.enumeration.ProjectActions;

/**
 * A DTO for the {@link com.localizeus.core.domain.ProjectHistory} entity.
 */
public class ProjectHistoryDTO implements Serializable {
    
    private Long id;

    private ProjectActions action;

    private String oldValue;

    private String newValue;


    private Long refUserId;

    private Long refTranslationKeyId;

    private Long refTranslationId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProjectActions getAction() {
        return action;
    }

    public void setAction(ProjectActions action) {
        this.action = action;
    }

    public String getOldValue() {
        return oldValue;
    }

    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public Long getRefUserId() {
        return refUserId;
    }

    public void setRefUserId(Long userId) {
        this.refUserId = userId;
    }

    public Long getRefTranslationKeyId() {
        return refTranslationKeyId;
    }

    public void setRefTranslationKeyId(Long translationKeyId) {
        this.refTranslationKeyId = translationKeyId;
    }

    public Long getRefTranslationId() {
        return refTranslationId;
    }

    public void setRefTranslationId(Long translationId) {
        this.refTranslationId = translationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectHistoryDTO)) {
            return false;
        }

        return id != null && id.equals(((ProjectHistoryDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectHistoryDTO{" +
            "id=" + getId() +
            ", action='" + getAction() + "'" +
            ", oldValue='" + getOldValue() + "'" +
            ", newValue='" + getNewValue() + "'" +
            ", refUserId=" + getRefUserId() +
            ", refTranslationKeyId=" + getRefTranslationKeyId() +
            ", refTranslationId=" + getRefTranslationId() +
            "}";
    }
}
