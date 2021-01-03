import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './api-key.reducer';
import { IApiKey } from 'app/shared/model/api-key.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApiKeyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApiKeyUpdate = (props: IApiKeyUpdateProps) => {
  const [refUserId, setRefUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { apiKeyEntity, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/api-key' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...apiKeyEntity,
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
          <h2 id="localizeusNoElasticApp.apiKey.home.createOrEditLabel">
            <Translate contentKey="localizeusNoElasticApp.apiKey.home.createOrEditLabel">Create or edit a ApiKey</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : apiKeyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="api-key-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="api-key-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="valueLabel" for="api-key-value">
                  <Translate contentKey="localizeusNoElasticApp.apiKey.value">Value</Translate>
                </Label>
                <AvField id="api-key-value" type="text" name="value" />
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="api-key-startDate">
                  <Translate contentKey="localizeusNoElasticApp.apiKey.startDate">Start Date</Translate>
                </Label>
                <AvField id="api-key-startDate" type="date" className="form-control" name="startDate" />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="api-key-endDate">
                  <Translate contentKey="localizeusNoElasticApp.apiKey.endDate">End Date</Translate>
                </Label>
                <AvField id="api-key-endDate" type="date" className="form-control" name="endDate" />
              </AvGroup>
              <AvGroup>
                <Label for="api-key-refUser">
                  <Translate contentKey="localizeusNoElasticApp.apiKey.refUser">Ref User</Translate>
                </Label>
                <AvInput id="api-key-refUser" type="select" className="form-control" name="refUserId">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/api-key" replace color="info">
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
  users: storeState.userManagement.users,
  apiKeyEntity: storeState.apiKey.entity,
  loading: storeState.apiKey.loading,
  updating: storeState.apiKey.updating,
  updateSuccess: storeState.apiKey.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiKeyUpdate);
