import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-project-permission.reducer';
import { IUserProjectPermission } from 'app/shared/model/user-project-permission.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserProjectPermissionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const UserProjectPermission = (props: IUserProjectPermissionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { userProjectPermissionList, match, loading } = props;
  return (
    <div>
      <h2 id="user-project-permission-heading">
        <Translate contentKey="localizeusNoElasticApp.userProjectPermission.home.title">User Project Permissions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="localizeusNoElasticApp.userProjectPermission.home.createLabel">
            Create new User Project Permission
          </Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {userProjectPermissionList && userProjectPermissionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="localizeusNoElasticApp.userProjectPermission.refUser">Ref User</Translate>
                </th>
                <th>
                  <Translate contentKey="localizeusNoElasticApp.userProjectPermission.refProject">Ref Project</Translate>
                </th>
                <th>
                  <Translate contentKey="localizeusNoElasticApp.userProjectPermission.refUserPermission">Ref User Permission</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userProjectPermissionList.map((userProjectPermission, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${userProjectPermission.id}`} color="link" size="sm">
                      {userProjectPermission.id}
                    </Button>
                  </td>
                  <td>{userProjectPermission.refUserId ? userProjectPermission.refUserId : ''}</td>
                  <td>
                    {userProjectPermission.refProjectId ? (
                      <Link to={`project/${userProjectPermission.refProjectId}`}>{userProjectPermission.refProjectId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {userProjectPermission.refUserPermissionId ? (
                      <Link to={`user-permission/${userProjectPermission.refUserPermissionId}`}>
                        {userProjectPermission.refUserPermissionId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userProjectPermission.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userProjectPermission.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userProjectPermission.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="localizeusNoElasticApp.userProjectPermission.home.notFound">
                No User Project Permissions found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ userProjectPermission }: IRootState) => ({
  userProjectPermissionList: userProjectPermission.entities,
  loading: userProjectPermission.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProjectPermission);
