import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ApiKeyUpdatePage from './api-key-update.page-object';

const expect = chai.expect;
export class ApiKeyDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusNoElasticApp.apiKey.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-apiKey'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ApiKeyComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('api-key-heading'));
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
    await navBarPage.getEntityPage('api-key');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateApiKey() {
    await this.createButton.click();
    return new ApiKeyUpdatePage();
  }

  async deleteApiKey() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const apiKeyDeleteDialog = new ApiKeyDeleteDialog();
    await waitUntilDisplayed(apiKeyDeleteDialog.deleteModal);
    expect(await apiKeyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/localizeusNoElasticApp.apiKey.delete.question/);
    await apiKeyDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(apiKeyDeleteDialog.deleteModal);

    expect(await isVisible(apiKeyDeleteDialog.deleteModal)).to.be.false;
  }
}
