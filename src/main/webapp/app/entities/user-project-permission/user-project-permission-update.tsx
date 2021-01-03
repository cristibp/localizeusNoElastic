import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { IUserPermission } from 'app/shared/model/user-permission.model';
import { getEntities as getUserPermissions } from 'app/entities/user-permission/user-permission.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-project-permission.reducer';
import { IUserProjectPermission } from 'app/shared/model/user-project-permission.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserProjectPermissionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserProjectPermissionUpdate = (props: IUserProjectPermissionUpdateProps) => {
  const [refUserId, setRefUserId] = useState('0');
  const [refProjectId, setRefProjectId] = useState('0');
  const [refUserPermissionId, setRefUserPermissionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { userProjectPermissionEntity, users, projects, userPermissions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-project-permission');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getProjects();
    props.getUserPermissions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...userProjectPermissionEntity,
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
          <h2 id="localizeusNoElasticApp.userProjectPermission.home.createOrEditLabel">
            <Translate contentKey="localizeusNoElasticApp.userProjectPermission.home.createOrEditLabel">
              Create or edit a UserProjectPermission
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : userProjectPermissionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-project-permission-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-project-permission-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="user-project-permission-refUser">
                  <Translate contentKey="localizeusNoElasticApp.userProjectPermission.refUser">Ref User</Translate>
                </Label>
                <AvInput id="user-project-permission-refUser" type="select" className="form-control" name="refUserId">
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
                <Label for="user-project-permission-refProject">
                  <Translate contentKey="localizeusNoElasticApp.userProjectPermission.refProject">Ref Project</Translate>
                </Label>
                <AvInput id="user-project-permission-refProject" type="select" className="form-control" name="refProjectId">
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
              <AvGroup>
                <Label for="user-project-permission-refUserPermission">
                  <Translate contentKey="localizeusNoElasticApp.userProjectPermission.refUserPermission">Ref User Permission</Translate>
                </Label>
                <AvInput id="user-project-permission-refUserPermission" type="select" className="form-control" name="refUserPermissionId">
                  <option value="" key="0" />
                  {userPermissions
                    ? userPermissions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/user-project-permission" replace color="info">
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
  userPermissions: storeState.userPermission.entities,
  userProjectPermissionEntity: storeState.userProjectPermission.entity,
  loading: storeState.userProjectPermission.loading,
  updating: storeState.userProjectPermission.updating,
  updateSuccess: storeState.userProjectPermission.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getProjects,
  getUserPermissions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProjectPermissionUpdate);
