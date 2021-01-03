package com.localizeus.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A UserProjectPermission.
 */
@Entity
@Table(name = "user_project_permission")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserProjectPermission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "userProjectPermissions", allowSetters = true)
    private User refUser;

    @ManyToOne
    @JsonIgnoreProperties(value = "userProjectPermissions", allowSetters = true)
    private Project refProject;

    @ManyToOne
    @JsonIgnoreProperties(value = "userProjectPermissions", allowSetters = true)
    private UserPermission refUserPermission;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getRefUser() {
        return refUser;
    }

    public UserProjectPermission refUser(User user) {
        this.refUser = user;
        return this;
    }

    public void setRefUser(User user) {
        this.refUser = user;
    }

    public Project getRefProject() {
        return refProject;
    }

    public UserProjectPermission refProject(Project project) {
        this.refProject = project;
        return this;
    }

    public void setRefProject(Project project) {
        this.refProject = project;
    }

    public UserPermission getRefUserPermission() {
        return refUserPermission;
    }

    public UserProjectPermission refUserPermission(UserPermission userPermission) {
        this.refUserPermission = userPermission;
        return this;
    }

    public void setRefUserPermission(UserPermission userPermission) {
        this.refUserPermission = userPermission;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProjectPermission)) {
            return false;
        }
        return id != null && id.equals(((UserProjectPermission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProjectPermission{" +
            "id=" + getId() +
            "}";
    }
}
