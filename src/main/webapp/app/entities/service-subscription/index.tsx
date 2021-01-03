import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ServiceSubscription from './service-subscription';
import ServiceSubscriptionDetail from './service-subscription-detail';
import ServiceSubscriptionUpdate from './service-subscription-update';
import ServiceSubscriptionDeleteDialog from './service-subscription-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ServiceSubscriptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ServiceSubscriptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ServiceSubscriptionDetail} />
      <ErrorBoundaryRoute path={match.url} component={ServiceSubscription} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ServiceSubscriptionDeleteDialog} />
  </>
);

export default Routes;
