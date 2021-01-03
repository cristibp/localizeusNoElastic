import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TranslationKey from './translation-key';
import TranslationKeyDetail from './translation-key-detail';
import TranslationKeyUpdate from './translation-key-update';
import TranslationKeyDeleteDialog from './translation-key-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TranslationKeyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TranslationKeyUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TranslationKeyDetail} />
      <ErrorBoundaryRoute path={match.url} component={TranslationKey} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TranslationKeyDeleteDialog} />
  </>
);

export default Routes;
