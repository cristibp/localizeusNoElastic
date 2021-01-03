import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import UserProjectPermissionUpdatePage from './user-project-permission-update.page-object';

const expect = chai.expect;
export class UserProjectPermissionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusNoElasticApp.userProjectPermission.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-userProjectPermission'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class UserProjectPermissionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('user-project-permission-heading'));
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
    await navBarPage.getEntityPage('user-project-permission');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateUserProjectPermission() {
    await this.createButton.click();
    return new UserProjectPermissionUpdatePage();
  }

  async deleteUserProjectPermission() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const userProjectPermissionDeleteDialog = new UserProjectPermissionDeleteDialog();
    await waitUntilDisplayed(userProjectPermissionDeleteDialog.deleteModal);
    expect(await userProjectPermissionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /localizeusNoElasticApp.userProjectPermission.delete.question/
    );
    await userProjectPermissionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(userProjectPermissionDeleteDialog.deleteModal);

    expect(await isVisible(userProjectPermissionDeleteDialog.deleteModal)).to.be.false;
  }
}
