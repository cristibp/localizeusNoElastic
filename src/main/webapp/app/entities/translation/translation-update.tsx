import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITranslationKey } from 'app/shared/model/translation-key.model';
import { getEntities as getTranslationKeys } from 'app/entities/translation-key/translation-key.reducer';
import { ILanguage } from 'app/shared/model/language.model';
import { getEntities as getLanguages } from 'app/entities/language/language.reducer';
import { getEntity, updateEntity, createEntity, reset } from './translation.reducer';
import { ITranslation } from 'app/shared/model/translation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITranslationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TranslationUpdate = (props: ITranslationUpdateProps) => {
  const [refTranslationKeyId, setRefTranslationKeyId] = useState('0');
  const [refLanguageId, setRefLanguageId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { translationEntity, translationKeys, languages, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/translation' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTranslationKeys();
    props.getLanguages();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...translationEntity,
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
          <h2 id="localizeusNoElasticApp.translation.home.createOrEditLabel">
            <Translate contentKey="localizeusNoElasticApp.translation.home.createOrEditLabel">Create or edit a Translation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : translationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="translation-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="translation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="valueLabel" for="translation-value">
                  <Translate contentKey="localizeusNoElasticApp.translation.value">Value</Translate>
                </Label>
                <AvField id="translation-value" type="text" name="value" />
              </AvGroup>
              <AvGroup>
                <Label for="translation-refTranslationKey">
                  <Translate contentKey="localizeusNoElasticApp.translation.refTranslationKey">Ref Translation Key</Translate>
                </Label>
                <AvInput id="translation-refTranslationKey" type="select" className="form-control" name="refTranslationKeyId">
                  <option value="" key="0" />
                  {translationKeys
                    ? translationKeys.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="translation-refLanguage">
                  <Translate contentKey="localizeusNoElasticApp.translation.refLanguage">Ref Language</Translate>
                </Label>
                <AvInput id="translation-refLanguage" type="select" className="form-control" name="refLanguageId">
                  <option value="" key="0" />
                  {languages
                    ? languages.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/translation" replace color="info">
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
  translationKeys: storeState.translationKey.entities,
  languages: storeState.language.entities,
  translationEntity: storeState.translation.entity,
  loading: storeState.translation.loading,
  updating: storeState.translation.updating,
  updateSuccess: storeState.translation.updateSuccess,
});

const mapDispatchToProps = {
  getTranslationKeys,
  getLanguages,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TranslationUpdate);
