import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserProjectPermission from './user-project-permission';
import UserProjectPermissionDetail from './user-project-permission-detail';
import UserProjectPermissionUpdate from './user-project-permission-update';
import UserProjectPermissionDeleteDialog from './user-project-permission-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserProjectPermissionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserProjectPermissionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserProjectPermissionDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserProjectPermission} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserProjectPermissionDeleteDialog} />
  </>
);

export default Routes;
