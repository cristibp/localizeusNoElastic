package com.localizeus.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

import com.localizeus.core.domain.enumeration.Periodicity;

/**
 * A ServiceSubscription.
 */
@Entity
@Table(name = "service_subscription")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ServiceSubscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start")
    private LocalDate start;

    @Column(name = "end")
    private LocalDate end;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_type")
    private Periodicity paymentType;

    @ManyToOne
    @JsonIgnoreProperties(value = "serviceSubscriptions", allowSetters = true)
    private Company refCompany;

    @ManyToOne
    @JsonIgnoreProperties(value = "serviceSubscriptions", allowSetters = true)
    private Plan refPlan;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStart() {
        return start;
    }

    public ServiceSubscription start(LocalDate start) {
        this.start = start;
        return this;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public ServiceSubscription end(LocalDate end) {
        this.end = end;
        return this;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public Periodicity getPaymentType() {
        return paymentType;
    }

    public ServiceSubscription paymentType(Periodicity paymentType) {
        this.paymentType = paymentType;
        return this;
    }

    public void setPaymentType(Periodicity paymentType) {
        this.paymentType = paymentType;
    }

    public Company getRefCompany() {
        return refCompany;
    }

    public ServiceSubscription refCompany(Company company) {
        this.refCompany = company;
        return this;
    }

    public void setRefCompany(Company company) {
        this.refCompany = company;
    }

    public Plan getRefPlan() {
        return refPlan;
    }

    public ServiceSubscription refPlan(Plan plan) {
        this.refPlan = plan;
        return this;
    }

    public void setRefPlan(Plan plan) {
        this.refPlan = plan;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ServiceSubscription)) {
            return false;
        }
        return id != null && id.equals(((ServiceSubscription) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ServiceSubscription{" +
            "id=" + getId() +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", paymentType='" + getPaymentType() + "'" +
            "}";
    }
}
