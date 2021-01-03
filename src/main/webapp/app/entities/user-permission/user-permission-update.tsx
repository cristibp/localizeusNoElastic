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
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-permission.reducer';
import { IUserPermission } from 'app/shared/model/user-permission.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserPermissionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserPermissionUpdate = (props: IUserPermissionUpdateProps) => {
  const [refUserId, setRefUserId] = useState('0');
  const [refProjectId, setRefProjectId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { userPermissionEntity, users, projects, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-permission');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getProjects();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...userPermissionEntity,
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
          <h2 id="localizeusNoElasticApp.userPermission.home.createOrEditLabel">
            <Translate contentKey="localizeusNoElasticApp.userPermission.home.createOrEditLabel">Create or edit a UserPermission</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userPermissionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-permission-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-permission-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeLabel" for="user-permission-type">
                  <Translate contentKey="localizeusNoElasticApp.userPermission.type">Type</Translate>
                </Label>
                <AvInput
                  id="user-permission-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && userPermissionEntity.type) || 'READ'}
                >
                  <option value="READ">{translate('localizeusNoElasticApp.PermissionType.READ')}</option>
                  <option value="CREATE">{translate('localizeusNoElasticApp.PermissionType.CREATE')}</option>
                  <option value="UPDATE">{translate('localizeusNoElasticApp.PermissionType.UPDATE')}</option>
                  <option value="DELETE">{translate('localizeusNoElasticApp.PermissionType.DELETE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="user-permission-refUser">
                  <Translate contentKey="localizeusNoElasticApp.userPermission.refUser">Ref User</Translate>
                </Label>
                <AvInput id="user-permission-refUser" type="select" className="form-control" name="refUserId">
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
              <AvGroup>
                <Label for="user-permission-refProject">
                  <Translate contentKey="localizeusNoElasticApp.userPermission.refProject">Ref Project</Translate>
                </Label>
                <AvInput id="user-permission-refProject" type="select" className="form-control" name="refProjectId">
                  <option value="" key="0" />
                  {projects
                    ? projects.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-permission" replace color="info">
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
  projects: storeState.project.entities,
  userPermissionEntity: storeState.userPermission.entity,
  loading: storeState.userPermission.loading,
  updating: storeState.userPermission.updating,
  updateSuccess: storeState.userPermission.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getProjects,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserPermissionUpdate);
