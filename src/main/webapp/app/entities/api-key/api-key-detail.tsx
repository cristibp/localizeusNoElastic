import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './api-key.reducer';
import { IApiKey } from 'app/shared/model/api-key.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApiKeyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApiKeyDetail = (props: IApiKeyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { apiKeyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusNoElasticApp.apiKey.detail.title">ApiKey</Translate> [<b>{apiKeyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="value">
              <Translate contentKey="localizeusNoElasticApp.apiKey.value">Value</Translate>
            </span>
          </dt>
          <dd>{apiKeyEntity.value}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="localizeusNoElasticApp.apiKey.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {apiKeyEntity.startDate ? <TextFormat value={apiKeyEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="localizeusNoElasticApp.apiKey.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{apiKeyEntity.endDate ? <TextFormat value={apiKeyEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="localizeusNoElasticApp.apiKey.refUser">Ref User</Translate>
          </dt>
          <dd>{apiKeyEntity.refUserId ? apiKeyEntity.refUserId : ''}</dd>
        </dl>
        <Button tag={Link} to="/api-key" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/api-key/${apiKeyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ apiKey }: IRootState) => ({
  apiKeyEntity: apiKey.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiKeyDetail);
