package com.localizeus.core.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.localizeus.core.domain.enumeration.Periodicity;

/**
 * A Plan.
 */
@Entity
@Table(name = "plan")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Plan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "cost_in_cents")
    private Long costInCents;

    @Column(name = "key_limit")
    private Long keyLimit;

    @Column(name = "calls_limit")
    private Long callsLimit;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private Periodicity type;

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

    public Plan name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCostInCents() {
        return costInCents;
    }

    public Plan costInCents(Long costInCents) {
        this.costInCents = costInCents;
        return this;
    }

    public void setCostInCents(Long costInCents) {
        this.costInCents = costInCents;
    }

    public Long getKeyLimit() {
        return keyLimit;
    }

    public Plan keyLimit(Long keyLimit) {
        this.keyLimit = keyLimit;
        return this;
    }

    public void setKeyLimit(Long keyLimit) {
        this.keyLimit = keyLimit;
    }

    public Long getCallsLimit() {
        return callsLimit;
    }

    public Plan callsLimit(Long callsLimit) {
        this.callsLimit = callsLimit;
        return this;
    }

    public void setCallsLimit(Long callsLimit) {
        this.callsLimit = callsLimit;
    }

    public Periodicity getType() {
        return type;
    }

    public Plan type(Periodicity type) {
        this.type = type;
        return this;
    }

    public void setType(Periodicity type) {
        this.type = type;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Plan)) {
            return false;
        }
        return id != null && id.equals(((Plan) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Plan{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", costInCents=" + getCostInCents() +
            ", keyLimit=" + getKeyLimit() +
            ", callsLimit=" + getCallsLimit() +
            ", type='" + getType() + "'" +
            "}";
    }
}
