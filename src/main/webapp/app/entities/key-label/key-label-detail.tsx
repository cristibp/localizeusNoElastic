import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './key-label.reducer';
import { IKeyLabel } from 'app/shared/model/key-label.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKeyLabelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const KeyLabelDetail = (props: IKeyLabelDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { keyLabelEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusNoElasticApp.keyLabel.detail.title">KeyLabel</Translate> [<b>{keyLabelEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="value">
              <Translate contentKey="localizeusNoElasticApp.keyLabel.value">Value</Translate>
            </span>
          </dt>
          <dd>{keyLabelEntity.value}</dd>
          <dt>
            <Translate contentKey="localizeusNoElasticApp.keyLabel.refTranslationKey">Ref Translation Key</Translate>
          </dt>
          <dd>{keyLabelEntity.refTranslationKeyId ? keyLabelEntity.refTranslationKeyId : ''}</dd>
        </dl>
        <Button tag={Link} to="/key-label" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/key-label/${keyLabelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ keyLabel }: IRootState) => ({
  keyLabelEntity: keyLabel.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(KeyLabelDetail);
