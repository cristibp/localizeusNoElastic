import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import KeyLabel from './key-label';
import KeyLabelDetail from './key-label-detail';
import KeyLabelUpdate from './key-label-update';
import KeyLabelDeleteDialog from './key-label-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={KeyLabelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={KeyLabelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={KeyLabelDetail} />
      <ErrorBoundaryRoute path={match.url} component={KeyLabel} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={KeyLabelDeleteDialog} />
  </>
);

export default Routes;
