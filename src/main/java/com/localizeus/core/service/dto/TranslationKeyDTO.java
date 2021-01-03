package com.localizeus.core.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.localizeus.core.domain.TranslationKey} entity.
 */
public class TranslationKeyDTO implements Serializable {
    
    private Long id;

    private String name;

    private String fallbackValue;


    private Long refProjectId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFallbackValue() {
        return fallbackValue;
    }

    public void setFallbackValue(String fallbackValue) {
        this.fallbackValue = fallbackValue;
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
        if (!(o instanceof TranslationKeyDTO)) {
            return false;
        }

        return id != null && id.equals(((TranslationKeyDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TranslationKeyDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", fallbackValue='" + getFallbackValue() + "'" +
            ", refProjectId=" + getRefProjectId() +
            "}";
    }
}
