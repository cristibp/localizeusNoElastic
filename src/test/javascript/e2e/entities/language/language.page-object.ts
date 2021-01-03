import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import LanguageUpdatePage from './language-update.page-object';

const expect = chai.expect;
export class LanguageDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusNoElasticApp.language.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-language'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class LanguageComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('language-heading'));
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
    await navBarPage.getEntityPage('language');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateLanguage() {
    await this.createButton.click();
    return new LanguageUpdatePage();
  }

  async deleteLanguage() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const languageDeleteDialog = new LanguageDeleteDialog();
    await waitUntilDisplayed(languageDeleteDialog.deleteModal);
    expect(await languageDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/localizeusNoElasticApp.language.delete.question/);
    await languageDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(languageDeleteDialog.deleteModal);

    expect(await isVisible(languageDeleteDialog.deleteModal)).to.be.false;
  }
}
