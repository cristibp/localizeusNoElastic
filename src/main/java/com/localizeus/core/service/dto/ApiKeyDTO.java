package com.localizeus.core.service.dto;

import java.time.LocalDate;
import java.io.Serializable;

/**
 * A DTO for the {@link com.localizeus.core.domain.ApiKey} entity.
 */
public class ApiKeyDTO implements Serializable {
    
    private Long id;

    private String value;

    private LocalDate startDate;

    private LocalDate endDate;


    private Long refUserId;
    
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

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Long getRefUserId() {
        return refUserId;
    }

    public void setRefUserId(Long userId) {
        this.refUserId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApiKeyDTO)) {
            return false;
        }

        return id != null && id.equals(((ApiKeyDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ApiKeyDTO{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", refUserId=" + getRefUserId() +
            "}";
    }
}
