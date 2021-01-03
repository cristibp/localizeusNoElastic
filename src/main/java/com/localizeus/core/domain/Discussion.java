package com.localizeus.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Discussion.
 */
@Entity
@Table(name = "discussion")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Discussion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "value")
    private String value;

    @ManyToOne
    @JsonIgnoreProperties(value = "discussions", allowSetters = true)
    private Project refProject;

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

    public Discussion value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Project getRefProject() {
        return refProject;
    }

    public Discussion refProject(Project project) {
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
        if (!(o instanceof Discussion)) {
            return false;
        }
        return id != null && id.equals(((Discussion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Discussion{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
