import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './plan.reducer';
import { IPlan } from 'app/shared/model/plan.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlanUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlanUpdate = (props: IPlanUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { planEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/plan' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...planEntity,
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
          <h2 id="localizeusNoElasticApp.plan.home.createOrEditLabel">
            <Translate contentKey="localizeusNoElasticApp.plan.home.createOrEditLabel">Create or edit a Plan</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : planEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="plan-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="plan-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="plan-name">
                  <Translate contentKey="localizeusNoElasticApp.plan.name">Name</Translate>
                </Label>
                <AvField id="plan-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="costInCentsLabel" for="plan-costInCents">
                  <Translate contentKey="localizeusNoElasticApp.plan.costInCents">Cost In Cents</Translate>
                </Label>
                <AvField id="plan-costInCents" type="string" className="form-control" name="costInCents" />
              </AvGroup>
              <AvGroup>
                <Label id="keyLimitLabel" for="plan-keyLimit">
                  <Translate contentKey="localizeusNoElasticApp.plan.keyLimit">Key Limit</Translate>
                </Label>
                <AvField id="plan-keyLimit" type="string" className="form-control" name="keyLimit" />
              </AvGroup>
              <AvGroup>
                <Label id="callsLimitLabel" for="plan-callsLimit">
                  <Translate contentKey="localizeusNoElasticApp.plan.callsLimit">Calls Limit</Translate>
                </Label>
                <AvField id="plan-callsLimit" type="string" className="form-control" name="callsLimit" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="plan-type">
                  <Translate contentKey="localizeusNoElasticApp.plan.type">Type</Translate>
                </Label>
                <AvInput id="plan-type" type="select" className="form-control" name="type" value={(!isNew && planEntity.type) || 'MONTHLY'}>
                  <option value="MONTHLY">{translate('localizeusNoElasticApp.Periodicity.MONTHLY')}</option>
                  <option value="SEMIANNUAL">{translate('localizeusNoElasticApp.Periodicity.SEMIANNUAL')}</option>
                  <option value="YEARLY">{translate('localizeusNoElasticApp.Periodicity.YEARLY')}</option>
                  <option value="BIANNUALLY">{translate('localizeusNoElasticApp.Periodicity.BIANNUALLY')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/plan" replace color="info">
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
  planEntity: storeState.plan.entity,
  loading: storeState.plan.loading,
  updating: storeState.plan.updating,
  updateSuccess: storeState.plan.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlanUpdate);
