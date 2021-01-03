import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PlanUpdatePage from './plan-update.page-object';

const expect = chai.expect;
export class PlanDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('localizeusNoElasticApp.plan.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-plan'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PlanComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('plan-heading'));
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
    await navBarPage.getEntityPage('plan');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePlan() {
    await this.createButton.click();
    return new PlanUpdatePage();
  }

  async deletePlan() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const planDeleteDialog = new PlanDeleteDialog();
    await waitUntilDisplayed(planDeleteDialog.deleteModal);
    expect(await planDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/localizeusNoElasticApp.plan.delete.question/);
    await planDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(planDeleteDialog.deleteModal);

    expect(await isVisible(planDeleteDialog.deleteModal)).to.be.false;
  }
}
