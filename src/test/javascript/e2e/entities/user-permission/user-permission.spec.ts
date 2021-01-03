import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserPermissionComponentsPage from './user-permission.page-object';
import UserPermissionUpdatePage from './user-permission-update.page-object';
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

describe('UserPermission e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userPermissionComponentsPage: UserPermissionComponentsPage;
  let userPermissionUpdatePage: UserPermissionUpdatePage;

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
    userPermissionComponentsPage = new UserPermissionComponentsPage();
    userPermissionComponentsPage = await userPermissionComponentsPage.goToPage(navBarPage);
  });

  it('should load UserPermissions', async () => {
    expect(await userPermissionComponentsPage.title.getText()).to.match(/User Permissions/);
    expect(await userPermissionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete UserPermissions', async () => {
    const beforeRecordsCount = (await isVisible(userPermissionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(userPermissionComponentsPage.table);
    userPermissionUpdatePage = await userPermissionComponentsPage.goToCreateUserPermission();
    await userPermissionUpdatePage.enterData();

    expect(await userPermissionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(userPermissionComponentsPage.table);
    await waitUntilCount(userPermissionComponentsPage.records, beforeRecordsCount + 1);
    expect(await userPermissionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await userPermissionComponentsPage.deleteUserPermission();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(userPermissionComponentsPage.records, beforeRecordsCount);
      expect(await userPermissionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(userPermissionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
