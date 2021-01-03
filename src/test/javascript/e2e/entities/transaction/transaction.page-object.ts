import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TransactionUpdatePage from './transaction-update.page-object';

const expect = chai.expect;
export class TransactionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusNoElasticApp.transaction.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-transaction'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TransactionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('transaction-heading'));
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
    await navBarPage.getEntityPage('transaction');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTransaction() {
    await this.createButton.click();
    return new TransactionUpdatePage();
  }

  async deleteTransaction() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const transactionDeleteDialog = new TransactionDeleteDialog();
    await waitUntilDisplayed(transactionDeleteDialog.deleteModal);
    expect(await transactionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /localizeusNoElasticApp.transaction.delete.question/
    );
    await transactionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(transactionDeleteDialog.deleteModal);

    expect(await isVisible(transactionDeleteDialog.deleteModal)).to.be.false;
  }
}
