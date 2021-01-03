import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import KeyLabelComponentsPage from './key-label.page-object';
import KeyLabelUpdatePage from './key-label-update.page-object';
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

describe('KeyLabel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let keyLabelComponentsPage: KeyLabelComponentsPage;
  let keyLabelUpdatePage: KeyLabelUpdatePage;

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
    keyLabelComponentsPage = new KeyLabelComponentsPage();
    keyLabelComponentsPage = await keyLabelComponentsPage.goToPage(navBarPage);
  });

  it('should load KeyLabels', async () => {
    expect(await keyLabelComponentsPage.title.getText()).to.match(/Key Labels/);
    expect(await keyLabelComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete KeyLabels', async () => {
    const beforeRecordsCount = (await isVisible(keyLabelComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(keyLabelComponentsPage.table);
    keyLabelUpdatePage = await keyLabelComponentsPage.goToCreateKeyLabel();
    await keyLabelUpdatePage.enterData();

    expect(await keyLabelComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(keyLabelComponentsPage.table);
    await waitUntilCount(keyLabelComponentsPage.records, beforeRecordsCount + 1);
    expect(await keyLabelComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await keyLabelComponentsPage.deleteKeyLabel();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(keyLabelComponentsPage.records, beforeRecordsCount);
      expect(await keyLabelComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(keyLabelComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
