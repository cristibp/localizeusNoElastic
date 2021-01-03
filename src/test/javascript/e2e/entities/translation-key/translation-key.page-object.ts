import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TranslationKeyUpdatePage from './translation-key-update.page-object';

const expect = chai.expect;
export class TranslationKeyDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusNoElasticApp.translationKey.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-translationKey'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TranslationKeyComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('translation-key-heading'));
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
    await navBarPage.getEntityPage('translation-key');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTranslationKey() {
    await this.createButton.click();
    return new TranslationKeyUpdatePage();
  }

  async deleteTranslationKey() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const translationKeyDeleteDialog = new TranslationKeyDeleteDialog();
    await waitUntilDisplayed(translationKeyDeleteDialog.deleteModal);
    expect(await translationKeyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /localizeusNoElasticApp.translationKey.delete.question/
    );
    await translationKeyDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(translationKeyDeleteDialog.deleteModal);

    expect(await isVisible(translationKeyDeleteDialog.deleteModal)).to.be.false;
  }
}
