import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserProjectPermissionComponentsPage from './user-project-permission.page-object';
import UserProjectPermissionUpdatePage from './user-project-permission-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('UserProjectPermission e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userProjectPermissionComponentsPage: UserProjectPermissionComponentsPage;
  let userProjectPermissionUpdatePage: UserProjectPermissionUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    userProjectPermissionComponentsPage = new UserProjectPermissionComponentsPage();
    userProjectPermissionComponentsPage = await userProjectPermissionComponentsPage.goToPage(navBarPage);
  });

  it('should load UserProjectPermissions', async () => {
    expect(await userProjectPermissionComponentsPage.title.getText()).to.match(/User Project Permissions/);
    expect(await userProjectPermissionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete UserProjectPermissions', async () => {
    const beforeRecordsCount = (await isVisible(userProjectPermissionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(userProjectPermissionComponentsPage.table);
    userProjectPermissionUpdatePage = await userProjectPermissionComponentsPage.goToCreateUserProjectPermission();
    await userProjectPermissionUpdatePage.enterData();

    expect(await userProjectPermissionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(userProjectPermissionComponentsPage.table);
    await waitUntilCount(userProjectPermissionComponentsPage.records, beforeRecordsCount + 1);
    expect(await userProjectPermissionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await userProjectPermissionComponentsPage.deleteUserProjectPermission();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(userProjectPermissionComponentsPage.records, beforeRecordsCount);
      expect(await userProjectPermissionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(userProjectPermissionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
