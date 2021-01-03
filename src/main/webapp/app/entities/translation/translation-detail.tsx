import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './translation.reducer';
import { ITranslation } from 'app/shared/model/translation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITranslationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TranslationDetail = (props: ITranslationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { translationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusNoElasticApp.translation.detail.title">Translation</Translate> [<b>{translationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="value">
              <Translate contentKey="localizeusNoElasticApp.translation.value">Value</Translate>
            </span>
          </dt>
          <dd>{translationEntity.value}</dd>
          <dt>
            <Translate contentKey="localizeusNoElasticApp.translation.refTranslationKey">Ref Translation Key</Translate>
          </dt>
          <dd>{translationEntity.refTranslationKeyId ? translationEntity.refTranslationKeyId : ''}</dd>
          <dt>
            <Translate contentKey="localizeusNoElasticApp.translation.refLanguage">Ref Language</Translate>
          </dt>
          <dd>{translationEntity.refLanguageId ? translationEntity.refLanguageId : ''}</dd>
        </dl>
        <Button tag={Link} to="/translation" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/translation/${translationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ translation }: IRootState) => ({
  translationEntity: translation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TranslationDetail);
