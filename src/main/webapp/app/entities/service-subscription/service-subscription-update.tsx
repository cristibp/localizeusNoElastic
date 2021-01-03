import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IPlan } from 'app/shared/model/plan.model';
import { getEntities as getPlans } from 'app/entities/plan/plan.reducer';
import { getEntity, updateEntity, createEntity, reset } from './service-subscription.reducer';
import { IServiceSubscription } from 'app/shared/model/service-subscription.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IServiceSubscriptionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ServiceSubscriptionUpdate = (props: IServiceSubscriptionUpdateProps) => {
  const [refCompanyId, setRefCompanyId] = useState('0');
  const [refPlanId, setRefPlanId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { serviceSubscriptionEntity, companies, plans, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/service-subscription' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCompanies();
    props.getPlans();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...serviceSubscriptionEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="localizeusNoElasticApp.serviceSubscription.home.createOrEditLabel">
            <Translate contentKey="localizeusNoElasticApp.serviceSubscription.home.createOrEditLabel">
              Create or edit a ServiceSubscription
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : serviceSubscriptionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="service-subscription-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="service-subscription-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="startLabel" for="service-subscription-start">
                  <Translate contentKey="localizeusNoElasticApp.serviceSubscription.start">Start</Translate>
                </Label>
                <AvField id="service-subscription-start" type="date" className="form-control" name="start" />
              </AvGroup>
              <AvGroup>
                <Label id="endLabel" for="service-subscription-end">
                  <Translate contentKey="localizeusNoElasticApp.serviceSubscription.end">End</Translate>
                </Label>
                <AvField id="service-subscription-end" type="date" className="form-control" name="end" />
              </AvGroup>
              <AvGroup>
                <Label id="paymentTypeLabel" for="service-subscription-paymentType">
                  <Translate contentKey="localizeusNoElasticApp.serviceSubscription.paymentType">Payment Type</Translate>
                </Label>
                <AvInput
                  id="service-subscription-paymentType"
                  type="select"
                  className="form-control"
                  name="paymentType"
                  value={(!isNew && serviceSubscriptionEntity.paymentType) || 'MONTHLY'}
                >
                  <option value="MONTHLY">{translate('localizeusNoElasticApp.Periodicity.MONTHLY')}</option>
                  <option value="SEMIANNUAL">{translate('localizeusNoElasticApp.Periodicity.SEMIANNUAL')}</option>
                  <option value="YEARLY">{translate('localizeusNoElasticApp.Periodicity.YEARLY')}</option>
                  <option value="BIANNUALLY">{translate('localizeusNoElasticApp.Periodicity.BIANNUALLY')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="service-subscription-refCompany">
                  <Translate contentKey="localizeusNoElasticApp.serviceSubscription.refCompany">Ref Company</Translate>
                </Label>
                <AvInput id="service-subscription-refCompany" type="select" className="form-control" name="refCompanyId">
                  <option value="" key="0" />
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="service-subscription-refPlan">
                  <Translate contentKey="localizeusNoElasticApp.serviceSubscription.refPlan">Ref Plan</Translate>
                </Label>
                <AvInput id="service-subscription-refPlan" type="select" className="form-control" name="refPlanId">
                  <option value="" key="0" />
                  {plans
                    ? plans.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/service-subscription" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  companies: storeState.company.entities,
  plans: storeState.plan.entities,
  serviceSubscriptionEntity: storeState.serviceSubscription.entity,
  loading: storeState.serviceSubscription.loading,
  updating: storeState.serviceSubscription.updating,
  updateSuccess: storeState.serviceSubscription.updateSuccess,
});

const mapDispatchToProps = {
  getCompanies,
  getPlans,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSubscriptionUpdate);
