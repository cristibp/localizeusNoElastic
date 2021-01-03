import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import KeyLabelUpdatePage from './key-label-update.page-object';

const expect = chai.expect;
export class KeyLabelDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusNoElasticApp.keyLabel.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-keyLabel'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class KeyLabelComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('key-label-heading'));
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
    await navBarPage.getEntityPage('key-label');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateKeyLabel() {
    await this.createButton.click();
    return new KeyLabelUpdatePage();
  }

  async deleteKeyLabel() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const keyLabelDeleteDialog = new KeyLabelDeleteDialog();
    await waitUntilDisplayed(keyLabelDeleteDialog.deleteModal);
    expect(await keyLabelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/localizeusNoElasticApp.keyLabel.delete.question/);
    await keyLabelDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(keyLabelDeleteDialog.deleteModal);

    expect(await isVisible(keyLabelDeleteDialog.deleteModal)).to.be.false;
  }
}
