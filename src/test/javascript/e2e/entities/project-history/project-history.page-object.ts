import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ProjectHistoryUpdatePage from './project-history-update.page-object';

const expect = chai.expect;
export class ProjectHistoryDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusNoElasticApp.projectHistory.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-projectHistory'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ProjectHistoryComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('project-history-heading'));
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
    await navBarPage.getEntityPage('project-history');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateProjectHistory() {
    await this.createButton.click();
    return new ProjectHistoryUpdatePage();
  }

  async deleteProjectHistory() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const projectHistoryDeleteDialog = new ProjectHistoryDeleteDialog();
    await waitUntilDisplayed(projectHistoryDeleteDialog.deleteModal);
    expect(await projectHistoryDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /localizeusNoElasticApp.projectHistory.delete.question/
    );
    await projectHistoryDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(projectHistoryDeleteDialog.deleteModal);

    expect(await isVisible(projectHistoryDeleteDialog.deleteModal)).to.be.false;
  }
}
