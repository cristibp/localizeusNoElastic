import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-project-permission.reducer';
import { IUserProjectPermission } from 'app/shared/model/user-project-permission.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserProjectPermissionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserProjectPermissionDetail = (props: IUserProjectPermissionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userProjectPermissionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusNoElasticApp.userProjectPermission.detail.title">UserProjectPermission</Translate> [
          <b>{userProjectPermissionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="localizeusNoElasticApp.userProjectPermission.refUser">Ref User</Translate>
          </dt>
          <dd>{userProjectPermissionEntity.refUserId ? userProjectPermissionEntity.refUserId : ''}</dd>
          <dt>
            <Translate contentKey="localizeusNoElasticApp.userProjectPermission.refProject">Ref Project</Translate>
          </dt>
          <dd>{userProjectPermissionEntity.refProjectId ? userProjectPermissionEntity.refProjectId : ''}</dd>
          <dt>
            <Translate contentKey="localizeusNoElasticApp.userProjectPermission.refUserPermission">Ref User Permission</Translate>
          </dt>
          <dd>{userProjectPermissionEntity.refUserPermissionId ? userProjectPermissionEntity.refUserPermissionId : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-project-permission" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-project-permission/${userProjectPermissionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userProjectPermission }: IRootState) => ({
  userProjectPermissionEntity: userProjectPermission.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserProjectPermissionDetail);
