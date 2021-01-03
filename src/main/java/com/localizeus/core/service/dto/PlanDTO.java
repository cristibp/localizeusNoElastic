package com.localizeus.core.service.dto;

import java.io.Serializable;
import com.localizeus.core.domain.enumeration.Periodicity;

/**
 * A DTO for the {@link com.localizeus.core.domain.Plan} entity.
 */
public class PlanDTO implements Serializable {
    
    private Long id;

    private String name;

    private Long costInCents;

    private Long keyLimit;

    private Long callsLimit;

    private Periodicity type;

    
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

    public Long getCostInCents() {
        return costInCents;
    }

    public void setCostInCents(Long costInCents) {
        this.costInCents = costInCents;
    }

    public Long getKeyLimit() {
        return keyLimit;
    }

    public void setKeyLimit(Long keyLimit) {
        this.keyLimit = keyLimit;
    }

    public Long getCallsLimit() {
        return callsLimit;
    }

    public void setCallsLimit(Long callsLimit) {
        this.callsLimit = callsLimit;
    }

    public Periodicity getType() {
        return type;
    }

    public void setType(Periodicity type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanDTO)) {
            return false;
        }

        return id != null && id.equals(((PlanDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlanDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", costInCents=" + getCostInCents() +
            ", keyLimit=" + getKeyLimit() +
            ", callsLimit=" + getCallsLimit() +
            ", type='" + getType() + "'" +
            "}";
    }
}
