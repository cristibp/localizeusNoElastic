import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TranslationComponentsPage from './translation.page-object';
import TranslationUpdatePage from './translation-update.page-object';
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

describe('Translation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let translationComponentsPage: TranslationComponentsPage;
  let translationUpdatePage: TranslationUpdatePage;

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
    translationComponentsPage = new TranslationComponentsPage();
    translationComponentsPage = await translationComponentsPage.goToPage(navBarPage);
  });

  it('should load Translations', async () => {
    expect(await translationComponentsPage.title.getText()).to.match(/Translations/);
    expect(await translationComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Translations', async () => {
    const beforeRecordsCount = (await isVisible(translationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(translationComponentsPage.table);
    translationUpdatePage = await translationComponentsPage.goToCreateTranslation();
    await translationUpdatePage.enterData();

    expect(await translationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(translationComponentsPage.table);
    await waitUntilCount(translationComponentsPage.records, beforeRecordsCount + 1);
    expect(await translationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await translationComponentsPage.deleteTranslation();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(translationComponentsPage.records, beforeRecordsCount);
      expect(await translationComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(translationComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
