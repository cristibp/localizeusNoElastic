package com.localizeus.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Translation.
 */
@Entity
@Table(name = "translation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Translation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "value")
    private String value;

    @ManyToOne
    @JsonIgnoreProperties(value = "translations", allowSetters = true)
    private TranslationKey refTranslationKey;

    @ManyToOne
    @JsonIgnoreProperties(value = "translations", allowSetters = true)
    private Language refLanguage;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public Translation value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public TranslationKey getRefTranslationKey() {
        return refTranslationKey;
    }

    public Translation refTranslationKey(TranslationKey translationKey) {
        this.refTranslationKey = translationKey;
        return this;
    }

    public void setRefTranslationKey(TranslationKey translationKey) {
        this.refTranslationKey = translationKey;
    }

    public Language getRefLanguage() {
        return refLanguage;
    }

    public Translation refLanguage(Language language) {
        this.refLanguage = language;
        return this;
    }

    public void setRefLanguage(Language language) {
        this.refLanguage = language;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Translation)) {
            return false;
        }
        return id != null && id.equals(((Translation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Translation{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
