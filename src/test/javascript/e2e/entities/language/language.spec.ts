import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LanguageComponentsPage from './language.page-object';
import LanguageUpdatePage from './language-update.page-object';
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

describe('Language e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let languageComponentsPage: LanguageComponentsPage;
  let languageUpdatePage: LanguageUpdatePage;

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
    languageComponentsPage = new LanguageComponentsPage();
    languageComponentsPage = await languageComponentsPage.goToPage(navBarPage);
  });

  it('should load Languages', async () => {
    expect(await languageComponentsPage.title.getText()).to.match(/Languages/);
    expect(await languageComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Languages', async () => {
    const beforeRecordsCount = (await isVisible(languageComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(languageComponentsPage.table);
    languageUpdatePage = await languageComponentsPage.goToCreateLanguage();
    await languageUpdatePage.enterData();

    expect(await languageComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(languageComponentsPage.table);
    await waitUntilCount(languageComponentsPage.records, beforeRecordsCount + 1);
    expect(await languageComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await languageComponentsPage.deleteLanguage();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(languageComponentsPage.records, beforeRecordsCount);
      expect(await languageComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(languageComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
