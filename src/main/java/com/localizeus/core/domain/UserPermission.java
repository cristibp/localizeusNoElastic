package com.localizeus.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.localizeus.core.domain.enumeration.PermissionType;

/**
 * A UserPermission.
 */
@Entity
@Table(name = "user_permission")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserPermission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private PermissionType type;

    @ManyToOne
    @JsonIgnoreProperties(value = "userPermissions", allowSetters = true)
    private User refUser;

    @ManyToOne
    @JsonIgnoreProperties(value = "userPermissions", allowSetters = true)
    private Project refProject;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PermissionType getType() {
        return type;
    }

    public UserPermission type(PermissionType type) {
        this.type = type;
        return this;
    }

    public void setType(PermissionType type) {
        this.type = type;
    }

    public User getRefUser() {
        return refUser;
    }

    public UserPermission refUser(User user) {
        this.refUser = user;
        return this;
    }

    public void setRefUser(User user) {
        this.refUser = user;
    }

    public Project getRefProject() {
        return refProject;
    }

    public UserPermission refProject(Project project) {
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
        if (!(o instanceof UserPermission)) {
            return false;
        }
        return id != null && id.equals(((UserPermission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserPermission{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
