import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import project, {
  ProjectState
} from 'app/entities/project/project.reducer';
// prettier-ignore
import translationKey, {
  TranslationKeyState
} from 'app/entities/translation-key/translation-key.reducer';
// prettier-ignore
import translation, {
  TranslationState
} from 'app/entities/translation/translation.reducer';
// prettier-ignore
import language, {
  LanguageState
} from 'app/entities/language/language.reducer';
// prettier-ignore
import comment, {
  CommentState
} from 'app/entities/comment/comment.reducer';
// prettier-ignore
import discussion, {
  DiscussionState
} from 'app/entities/discussion/discussion.reducer';
// prettier-ignore
import projectHistory, {
  ProjectHistoryState
} from 'app/entities/project-history/project-history.reducer';
// prettier-ignore
import apiKey, {
  ApiKeyState
} from 'app/entities/api-key/api-key.reducer';
// prettier-ignore
import keyLabel, {
  KeyLabelState
} from 'app/entities/key-label/key-label.reducer';
// prettier-ignore
import userPermission, {
  UserPermissionState
} from 'app/entities/user-permission/user-permission.reducer';
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import transaction, {
  TransactionState
} from 'app/entities/transaction/transaction.reducer';
// prettier-ignore
import plan, {
  PlanState
} from 'app/entities/plan/plan.reducer';
// prettier-ignore
import serviceSubscription, {
  ServiceSubscriptionState
} from 'app/entities/service-subscription/service-subscription.reducer';
// prettier-ignore
import userProjectPermission, {
  UserProjectPermissionState
} from 'app/entities/user-project-permission/user-project-permission.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly project: ProjectState;
  readonly translationKey: TranslationKeyState;
  readonly translation: TranslationState;
  readonly language: LanguageState;
  readonly comment: CommentState;
  readonly discussion: DiscussionState;
  readonly projectHistory: ProjectHistoryState;
  readonly apiKey: ApiKeyState;
  readonly keyLabel: KeyLabelState;
  readonly userPermission: UserPermissionState;
  readonly company: CompanyState;
  readonly transaction: TransactionState;
  readonly plan: PlanState;
  readonly serviceSubscription: ServiceSubscriptionState;
  readonly userProjectPermission: UserProjectPermissionState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  project,
  translationKey,
  translation,
  language,
  comment,
  discussion,
  projectHistory,
  apiKey,
  keyLabel,
  userPermission,
  company,
  transaction,
  plan,
  serviceSubscription,
  userProjectPermission,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
