import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProjectHistoryComponentsPage from './project-history.page-object';
import ProjectHistoryUpdatePage from './project-history-update.page-object';
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

describe('ProjectHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let projectHistoryComponentsPage: ProjectHistoryComponentsPage;
  let projectHistoryUpdatePage: ProjectHistoryUpdatePage;

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
    projectHistoryComponentsPage = new ProjectHistoryComponentsPage();
    projectHistoryComponentsPage = await projectHistoryComponentsPage.goToPage(navBarPage);
  });

  it('should load ProjectHistories', async () => {
    expect(await projectHistoryComponentsPage.title.getText()).to.match(/Project Histories/);
    expect(await projectHistoryComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete ProjectHistories', async () => {
    const beforeRecordsCount = (await isVisible(projectHistoryComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(projectHistoryComponentsPage.table);
    projectHistoryUpdatePage = await projectHistoryComponentsPage.goToCreateProjectHistory();
    await projectHistoryUpdatePage.enterData();

    expect(await projectHistoryComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(projectHistoryComponentsPage.table);
    await waitUntilCount(projectHistoryComponentsPage.records, beforeRecordsCount + 1);
    expect(await projectHistoryComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await projectHistoryComponentsPage.deleteProjectHistory();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(projectHistoryComponentsPage.records, beforeRecordsCount);
      expect(await projectHistoryComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(projectHistoryComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
