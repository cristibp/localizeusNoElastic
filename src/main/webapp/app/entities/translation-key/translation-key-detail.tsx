import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './translation-key.reducer';
import { ITranslationKey } from 'app/shared/model/translation-key.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITranslationKeyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TranslationKeyDetail = (props: ITranslationKeyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { translationKeyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusNoElasticApp.translationKey.detail.title">TranslationKey</Translate> [
          <b>{translationKeyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="localizeusNoElasticApp.translationKey.name">Name</Translate>
            </span>
          </dt>
          <dd>{translationKeyEntity.name}</dd>
          <dt>
            <span id="fallbackValue">
              <Translate contentKey="localizeusNoElasticApp.translationKey.fallbackValue">Fallback Value</Translate>
            </span>
          </dt>
          <dd>{translationKeyEntity.fallbackValue}</dd>
          <dt>
            <Translate contentKey="localizeusNoElasticApp.translationKey.refProject">Ref Project</Translate>
          </dt>
          <dd>{translationKeyEntity.refProjectId ? translationKeyEntity.refProjectId : ''}</dd>
        </dl>
        <Button tag={Link} to="/translation-key" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/translation-key/${translationKeyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ translationKey }: IRootState) => ({
  translationKeyEntity: translationKey.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TranslationKeyDetail);
