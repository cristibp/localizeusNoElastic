import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-permission.reducer';
import { IUserPermission } from 'app/shared/model/user-permission.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserPermissionProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const UserPermission = (props: IUserPermissionProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { userPermissionList, match, loading } = props;
  return (
    <div>
      <h2 id="user-permission-heading">
        <Translate contentKey="localizeusNoElasticApp.userPermission.home.title">User Permissions</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="localizeusNoElasticApp.userPermission.home.createLabel">Create new User Permission</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {userPermissionList && userPermissionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="localizeusNoElasticApp.userPermission.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="localizeusNoElasticApp.userPermission.refUser">Ref User</Translate>
                </th>
                <th>
                  <Translate contentKey="localizeusNoElasticApp.userPermission.refProject">Ref Project</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userPermissionList.map((userPermission, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${userPermission.id}`} color="link" size="sm">
                      {userPermission.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`localizeusNoElasticApp.PermissionType.${userPermission.type}`} />
                  </td>
                  <td>{userPermission.refUserId ? userPermission.refUserId : ''}</td>
                  <td>
                    {userPermission.refProjectId ? (
                      <Link to={`project/${userPermission.refProjectId}`}>{userPermission.refProjectId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userPermission.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userPermission.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userPermission.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="localizeusNoElasticApp.userPermission.home.notFound">No User Permissions found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ userPermission }: IRootState) => ({
  userPermissionList: userPermission.entities,
  loading: userPermission.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserPermission);
