import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ApiKey from './api-key';
import ApiKeyDetail from './api-key-detail';
import ApiKeyUpdate from './api-key-update';
import ApiKeyDeleteDialog from './api-key-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ApiKeyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ApiKeyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ApiKeyDetail} />
      <ErrorBoundaryRoute path={match.url} component={ApiKey} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ApiKeyDeleteDialog} />
  </>
);

export default Routes;
