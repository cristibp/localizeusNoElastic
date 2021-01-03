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
import { getEntity, updateEntity, createEntity, reset } from './key-label.reducer';
import { IKeyLabel } from 'app/shared/model/key-label.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IKeyLabelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const KeyLabelUpdate = (props: IKeyLabelUpdateProps) => {
  const [refTranslationKeyId, setRefTranslationKeyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { keyLabelEntity, translationKeys, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/key-label' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTranslationKeys();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...keyLabelEntity,
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
          <h2 id="localizeusNoElasticApp.keyLabel.home.createOrEditLabel">
            <Translate contentKey="localizeusNoElasticApp.keyLabel.home.createOrEditLabel">Create or edit a KeyLabel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : keyLabelEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="key-label-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="key-label-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="valueLabel" for="key-label-value">
                  <Translate contentKey="localizeusNoElasticApp.keyLabel.value">Value</Translate>
                </Label>
                <AvField id="key-label-value" type="text" name="value" />
              </AvGroup>
              <AvGroup>
                <Label for="key-label-refTranslationKey">
                  <Translate contentKey="localizeusNoElasticApp.keyLabel.refTranslationKey">Ref Translation Key</Translate>
                </Label>
                <AvInput id="key-label-refTranslationKey" type="select" className="form-control" name="refTranslationKeyId">
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
              <Button tag={Link} id="cancel-save" to="/key-label" replace color="info">
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
  keyLabelEntity: storeState.keyLabel.entity,
  loading: storeState.keyLabel.loading,
  updating: storeState.keyLabel.updating,
  updateSuccess: storeState.keyLabel.updateSuccess,
});

const mapDispatchToProps = {
  getTranslationKeys,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(KeyLabelUpdate);
