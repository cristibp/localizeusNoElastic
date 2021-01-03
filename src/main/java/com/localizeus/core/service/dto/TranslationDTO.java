package com.localizeus.core.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.localizeus.core.domain.Translation} entity.
 */
public class TranslationDTO implements Serializable {
    
    private Long id;

    private String value;


    private Long refTranslationKeyId;

    private Long refLanguageId;
    
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

    public Long getRefLanguageId() {
        return refLanguageId;
    }

    public void setRefLanguageId(Long languageId) {
        this.refLanguageId = languageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TranslationDTO)) {
            return false;
        }

        return id != null && id.equals(((TranslationDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TranslationDTO{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", refTranslationKeyId=" + getRefTranslationKeyId() +
            ", refLanguageId=" + getRefLanguageId() +
            "}";
    }
}
