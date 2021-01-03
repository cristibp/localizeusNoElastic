package com.localizeus.core.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.localizeus.core.domain.KeyLabel} entity.
 */
public class KeyLabelDTO implements Serializable {
    
    private Long id;

    private String value;


    private Long refTranslationKeyId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getRefTranslationKeyId() {
        return refTranslationKeyId;
    }

    public void setRefTranslationKeyId(Long translationKeyId) {
        this.refTranslationKeyId = translationKeyId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KeyLabelDTO)) {
            return false;
        }

        return id != null && id.equals(((KeyLabelDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KeyLabelDTO{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", refTranslationKeyId=" + getRefTranslationKeyId() +
            "}";
    }
}
