package com.localizeus.core.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import com.localizeus.core.domain.enumeration.Periodicity;

/**
 * A DTO for the {@link com.localizeus.core.domain.ServiceSubscription} entity.
 */
public class ServiceSubscriptionDTO implements Serializable {
    
    private Long id;

    private LocalDate start;

    private LocalDate end;

    private Periodicity paymentType;


    private Long refCompanyId;

    private Long refPlanId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStart() {
        return start;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public Periodicity getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(Periodicity paymentType) {
        this.paymentType = paymentType;
    }

    public Long getRefCompanyId() {
        return refCompanyId;
    }

    public void setRefCompanyId(Long companyId) {
        this.refCompanyId = companyId;
    }

    public Long getRefPlanId() {
        return refPlanId;
    }

    public void setRefPlanId(Long planId) {
        this.refPlanId = planId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ServiceSubscriptionDTO)) {
            return false;
        }

        return id != null && id.equals(((ServiceSubscriptionDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ServiceSubscriptionDTO{" +
            "id=" + getId() +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", paymentType='" + getPaymentType() + "'" +
            ", refCompanyId=" + getRefCompanyId() +
            ", refPlanId=" + getRefPlanId() +
            "}";
    }
}
