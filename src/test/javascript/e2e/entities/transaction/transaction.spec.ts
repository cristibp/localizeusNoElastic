import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TransactionComponentsPage from './transaction.page-object';
import TransactionUpdatePage from './transaction-update.page-object';
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

describe('Transaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transactionComponentsPage: TransactionComponentsPage;
  let transactionUpdatePage: TransactionUpdatePage;

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
    transactionComponentsPage = new TransactionComponentsPage();
    transactionComponentsPage = await transactionComponentsPage.goToPage(navBarPage);
  });

  it('should load Transactions', async () => {
    expect(await transactionComponentsPage.title.getText()).to.match(/Transactions/);
    expect(await transactionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Transactions', async () => {
    const beforeRecordsCount = (await isVisible(transactionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(transactionComponentsPage.table);
    transactionUpdatePage = await transactionComponentsPage.goToCreateTransaction();
    await transactionUpdatePage.enterData();

    expect(await transactionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(transactionComponentsPage.table);
    await waitUntilCount(transactionComponentsPage.records, beforeRecordsCount + 1);
    expect(await transactionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await transactionComponentsPage.deleteTransaction();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(transactionComponentsPage.records, beforeRecordsCount);
      expect(await transactionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(transactionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
