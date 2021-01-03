package com.localizeus.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TranslationKey.
 */
@Entity
@Table(name = "translation_key")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TranslationKey implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "fallback_value")
    private String fallbackValue;

    @ManyToOne
    @JsonIgnoreProperties(value = "translationKeys", allowSetters = true)
    private Project refProject;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TranslationKey name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFallbackValue() {
        return fallbackValue;
    }

    public TranslationKey fallbackValue(String fallbackValue) {
        this.fallbackValue = fallbackValue;
        return this;
    }

    public void setFallbackValue(String fallbackValue) {
        this.fallbackValue = fallbackValue;
    }

    public Project getRefProject() {
        return refProject;
    }

    public TranslationKey refProject(Project project) {
        this.refProject = project;
        return this;
    }

    public void setRefProject(Project project) {
        this.refProject = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TranslationKey)) {
            return false;
        }
        return id != null && id.equals(((TranslationKey) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TranslationKey{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", fallbackValue='" + getFallbackValue() + "'" +
            "}";
    }
}
