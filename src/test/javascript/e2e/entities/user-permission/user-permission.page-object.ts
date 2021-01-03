import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import UserPermissionUpdatePage from './user-permission-update.page-object';

const expect = chai.expect;
export class UserPermissionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusNoElasticApp.userPermission.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-userPermission'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class UserPermissionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('user-permission-heading'));
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
    await navBarPage.getEntityPage('user-permission');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateUserPermission() {
    await this.createButton.click();
    return new UserPermissionUpdatePage();
  }

  async deleteUserPermission() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const userPermissionDeleteDialog = new UserPermissionDeleteDialog();
    await waitUntilDisplayed(userPermissionDeleteDialog.deleteModal);
    expect(await userPermissionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /localizeusNoElasticApp.userPermission.delete.question/
    );
    await userPermissionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(userPermissionDeleteDialog.deleteModal);

    expect(await isVisible(userPermissionDeleteDialog.deleteModal)).to.be.false;
  }
}
