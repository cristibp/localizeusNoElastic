import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './service-subscription.reducer';
import { IServiceSubscription } from 'app/shared/model/service-subscription.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IServiceSubscriptionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ServiceSubscriptionDetail = (props: IServiceSubscriptionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { serviceSubscriptionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusNoElasticApp.serviceSubscription.detail.title">ServiceSubscription</Translate> [
          <b>{serviceSubscriptionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="start">
              <Translate contentKey="localizeusNoElasticApp.serviceSubscription.start">Start</Translate>
            </span>
          </dt>
          <dd>
            {serviceSubscriptionEntity.start ? (
              <TextFormat value={serviceSubscriptionEntity.start} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="end">
              <Translate contentKey="localizeusNoElasticApp.serviceSubscription.end">End</Translate>
            </span>
          </dt>
          <dd>
            {serviceSubscriptionEntity.end ? (
              <TextFormat value={serviceSubscriptionEntity.end} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="paymentType">
              <Translate contentKey="localizeusNoElasticApp.serviceSubscription.paymentType">Payment Type</Translate>
            </span>
          </dt>
          <dd>{serviceSubscriptionEntity.paymentType}</dd>
          <dt>
            <Translate contentKey="localizeusNoElasticApp.serviceSubscription.refCompany">Ref Company</Translate>
          </dt>
          <dd>{serviceSubscriptionEntity.refCompanyId ? serviceSubscriptionEntity.refCompanyId : ''}</dd>
          <dt>
            <Translate contentKey="localizeusNoElasticApp.serviceSubscription.refPlan">Ref Plan</Translate>
          </dt>
          <dd>{serviceSubscriptionEntity.refPlanId ? serviceSubscriptionEntity.refPlanId : ''}</dd>
        </dl>
        <Button tag={Link} to="/service-subscription" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/service-subscription/${serviceSubscriptionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ serviceSubscription }: IRootState) => ({
  serviceSubscriptionEntity: serviceSubscription.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSubscriptionDetail);
