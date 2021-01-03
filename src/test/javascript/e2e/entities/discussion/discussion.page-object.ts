import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DiscussionUpdatePage from './discussion-update.page-object';

const expect = chai.expect;
export class DiscussionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusNoElasticApp.discussion.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-discussion'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DiscussionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('discussion-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('discussion');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDiscussion() {
    await this.createButton.click();
    return new DiscussionUpdatePage();
  }

  async deleteDiscussion() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const discussionDeleteDialog = new DiscussionDeleteDialog();
    await waitUntilDisplayed(discussionDeleteDialog.deleteModal);
    expect(await discussionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/localizeusNoElasticApp.discussion.delete.question/);
    await discussionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(discussionDeleteDialog.deleteModal);

    expect(await isVisible(discussionDeleteDialog.deleteModal)).to.be.false;
  }
}
