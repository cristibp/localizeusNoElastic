import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './plan.reducer';
import { IPlan } from 'app/shared/model/plan.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlanDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlanDetail = (props: IPlanDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { planEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusNoElasticApp.plan.detail.title">Plan</Translate> [<b>{planEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="localizeusNoElasticApp.plan.name">Name</Translate>
            </span>
          </dt>
          <dd>{planEntity.name}</dd>
          <dt>
            <span id="costInCents">
              <Translate contentKey="localizeusNoElasticApp.plan.costInCents">Cost In Cents</Translate>
            </span>
          </dt>
          <dd>{planEntity.costInCents}</dd>
          <dt>
            <span id="keyLimit">
              <Translate contentKey="localizeusNoElasticApp.plan.keyLimit">Key Limit</Translate>
            </span>
          </dt>
          <dd>{planEntity.keyLimit}</dd>
          <dt>
            <span id="callsLimit">
              <Translate contentKey="localizeusNoElasticApp.plan.callsLimit">Calls Limit</Translate>
            </span>
          </dt>
          <dd>{planEntity.callsLimit}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="localizeusNoElasticApp.plan.type">Type</Translate>
            </span>
          </dt>
          <dd>{planEntity.type}</dd>
        </dl>
        <Button tag={Link} to="/plan" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/plan/${planEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ plan }: IRootState) => ({
  planEntity: plan.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetail);
