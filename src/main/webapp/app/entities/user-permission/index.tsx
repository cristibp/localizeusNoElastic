import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserPermission from './user-permission';
import UserPermissionDetail from './user-permission-detail';
import UserPermissionUpdate from './user-permission-update';
import UserPermissionDeleteDialog from './user-permission-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserPermissionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserPermissionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserPermissionDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserPermission} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserPermissionDeleteDialog} />
  </>
);

export default Routes;
