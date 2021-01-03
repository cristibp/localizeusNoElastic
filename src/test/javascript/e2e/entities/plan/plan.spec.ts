import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PlanComponentsPage from './plan.page-object';
import PlanUpdatePage from './plan-update.page-object';
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

describe('Plan e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let planComponentsPage: PlanComponentsPage;
  let planUpdatePage: PlanUpdatePage;

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
    planComponentsPage = new PlanComponentsPage();
    planComponentsPage = await planComponentsPage.goToPage(navBarPage);
  });

  it('should load Plans', async () => {
    expect(await planComponentsPage.title.getText()).to.match(/Plans/);
    expect(await planComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Plans', async () => {
    const beforeRecordsCount = (await isVisible(planComponentsPage.noRecords)) ? 0 : await getRecordsCount(planComponentsPage.table);
    planUpdatePage = await planComponentsPage.goToCreatePlan();
    await planUpdatePage.enterData();

    expect(await planComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(planComponentsPage.table);
    await waitUntilCount(planComponentsPage.records, beforeRecordsCount + 1);
    expect(await planComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await planComponentsPage.deletePlan();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(planComponentsPage.records, beforeRecordsCount);
      expect(await planComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(planComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
