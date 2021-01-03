import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ApiKeyComponentsPage from './api-key.page-object';
import ApiKeyUpdatePage from './api-key-update.page-object';
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

describe('ApiKey e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let apiKeyComponentsPage: ApiKeyComponentsPage;
  let apiKeyUpdatePage: ApiKeyUpdatePage;

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
    apiKeyComponentsPage = new ApiKeyComponentsPage();
    apiKeyComponentsPage = await apiKeyComponentsPage.goToPage(navBarPage);
  });

  it('should load ApiKeys', async () => {
    expect(await apiKeyComponentsPage.title.getText()).to.match(/Api Keys/);
    expect(await apiKeyComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ApiKeys', async () => {
    const beforeRecordsCount = (await isVisible(apiKeyComponentsPage.noRecords)) ? 0 : await getRecordsCount(apiKeyComponentsPage.table);
    apiKeyUpdatePage = await apiKeyComponentsPage.goToCreateApiKey();
    await apiKeyUpdatePage.enterData();

    expect(await apiKeyComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(apiKeyComponentsPage.table);
    await waitUntilCount(apiKeyComponentsPage.records, beforeRecordsCount + 1);
    expect(await apiKeyComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await apiKeyComponentsPage.deleteApiKey();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(apiKeyComponentsPage.records, beforeRecordsCount);
      expect(await apiKeyComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(apiKeyComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
