import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TranslationKeyComponentsPage from './translation-key.page-object';
import TranslationKeyUpdatePage from './translation-key-update.page-object';
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

describe('TranslationKey e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let translationKeyComponentsPage: TranslationKeyComponentsPage;
  let translationKeyUpdatePage: TranslationKeyUpdatePage;

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
    translationKeyComponentsPage = new TranslationKeyComponentsPage();
    translationKeyComponentsPage = await translationKeyComponentsPage.goToPage(navBarPage);
  });

  it('should load TranslationKeys', async () => {
    expect(await translationKeyComponentsPage.title.getText()).to.match(/Translation Keys/);
    expect(await translationKeyComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TranslationKeys', async () => {
    const beforeRecordsCount = (await isVisible(translationKeyComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(translationKeyComponentsPage.table);
    translationKeyUpdatePage = await translationKeyComponentsPage.goToCreateTranslationKey();
    await translationKeyUpdatePage.enterData();

    expect(await translationKeyComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(translationKeyComponentsPage.table);
    await waitUntilCount(translationKeyComponentsPage.records, beforeRecordsCount + 1);
    expect(await translationKeyComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await translationKeyComponentsPage.deleteTranslationKey();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(translationKeyComponentsPage.records, beforeRecordsCount);
      expect(await translationKeyComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(translationKeyComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
