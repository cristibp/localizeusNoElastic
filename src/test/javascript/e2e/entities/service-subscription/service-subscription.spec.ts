import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ServiceSubscriptionComponentsPage from './service-subscription.page-object';
import ServiceSubscriptionUpdatePage from './service-subscription-update.page-object';
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

describe('ServiceSubscription e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let serviceSubscriptionComponentsPage: ServiceSubscriptionComponentsPage;
  let serviceSubscriptionUpdatePage: ServiceSubscriptionUpdatePage;

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
    serviceSubscriptionComponentsPage = new ServiceSubscriptionComponentsPage();
    serviceSubscriptionComponentsPage = await serviceSubscriptionComponentsPage.goToPage(navBarPage);
  });

  it('should load ServiceSubscriptions', async () => {
    expect(await serviceSubscriptionComponentsPage.title.getText()).to.match(/Service Subscriptions/);
    expect(await serviceSubscriptionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ServiceSubscriptions', async () => {
    const beforeRecordsCount = (await isVisible(serviceSubscriptionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(serviceSubscriptionComponentsPage.table);
    serviceSubscriptionUpdatePage = await serviceSubscriptionComponentsPage.goToCreateServiceSubscription();
    await serviceSubscriptionUpdatePage.enterData();

    expect(await serviceSubscriptionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(serviceSubscriptionComponentsPage.table);
    await waitUntilCount(serviceSubscriptionComponentsPage.records, beforeRecordsCount + 1);
    expect(await serviceSubscriptionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await serviceSubscriptionComponentsPage.deleteServiceSubscription();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(serviceSubscriptionComponentsPage.records, beforeRecordsCount);
      expect(await serviceSubscriptionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(serviceSubscriptionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
