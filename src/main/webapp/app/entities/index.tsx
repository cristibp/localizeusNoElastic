import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Project from './project';
import TranslationKey from './translation-key';
import Translation from './translation';
import Language from './language';
import Comment from './comment';
import Discussion from './discussion';
import ProjectHistory from './project-history';
import ApiKey from './api-key';
import KeyLabel from './key-label';
import UserPermission from './user-permission';
import Company from './company';
import Transaction from './transaction';
import Plan from './plan';
import ServiceSubscription from './service-subscription';
import UserProjectPermission from './user-project-permission';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}project`} component={Project} />
      <ErrorBoundaryRoute path={`${match.url}translation-key`} component={TranslationKey} />
      <ErrorBoundaryRoute path={`${match.url}translation`} component={Translation} />
      <ErrorBoundaryRoute path={`${match.url}language`} component={Language} />
      <ErrorBoundaryRoute path={`${match.url}comment`} component={Comment} />
      <ErrorBoundaryRoute path={`${match.url}discussion`} component={Discussion} />
      <ErrorBoundaryRoute path={`${match.url}project-history`} component={ProjectHistory} />
      <ErrorBoundaryRoute path={`${match.url}api-key`} component={ApiKey} />
      <ErrorBoundaryRoute path={`${match.url}key-label`} component={KeyLabel} />
      <ErrorBoundaryRoute path={`${match.url}user-permission`} component={UserPermission} />
      <ErrorBoundaryRoute path={`${match.url}company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}transaction`} component={Transaction} />
      <ErrorBoundaryRoute path={`${match.url}plan`} component={Plan} />
      <ErrorBoundaryRoute path={`${match.url}service-subscription`} component={ServiceSubscription} />
      <ErrorBoundaryRoute path={`${match.url}user-project-permission`} component={UserProjectPermission} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
