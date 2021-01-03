import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DiscussionComponentsPage from './discussion.page-object';
import DiscussionUpdatePage from './discussion-update.page-object';
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

describe('Discussion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let discussionComponentsPage: DiscussionComponentsPage;
  let discussionUpdatePage: DiscussionUpdatePage;

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
    discussionComponentsPage = new DiscussionComponentsPage();
    discussionComponentsPage = await discussionComponentsPage.goToPage(navBarPage);
  });

  it('should load Discussions', async () => {
    expect(await discussionComponentsPage.title.getText()).to.match(/Discussions/);
    expect(await discussionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Discussions', async () => {
    const beforeRecordsCount = (await isVisible(discussionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(discussionComponentsPage.table);
    discussionUpdatePage = await discussionComponentsPage.goToCreateDiscussion();
    await discussionUpdatePage.enterData();

    expect(await discussionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(discussionComponentsPage.table);
    await waitUntilCount(discussionComponentsPage.records, beforeRecordsCount + 1);
    expect(await discussionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await discussionComponentsPage.deleteDiscussion();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(discussionComponentsPage.records, beforeRecordsCount);
      expect(await discussionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(discussionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
