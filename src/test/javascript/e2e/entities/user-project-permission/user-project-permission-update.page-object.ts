import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class UserProjectPermissionUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusNoElasticApp.userProjectPermission.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  refUserSelect: ElementFinder = element(by.css('select#user-project-permission-refUser'));
  refProjectSelect: ElementFinder = element(by.css('select#user-project-permission-refProject'));
  refUserPermissionSelect: ElementFinder = element(by.css('select#user-project-permission-refUserPermission'));

  getPageTitle() {
    return this.pageTitle;
  }

  async refUserSelectLastOption() {
    await this.refUserSelect.all(by.tagName('option')).last().click();
  }

  async refUserSelectOption(option) {
    await this.refUserSelect.sendKeys(option);
  }

  getRefUserSelect() {
    return this.refUserSelect;
  }

  async getRefUserSelectedOption() {
    return this.refUserSelect.element(by.css('option:checked')).getText();
  }

  async refProjectSelectLastOption() {
    await this.refProjectSelect.all(by.tagName('option')).last().click();
  }

  async refProjectSelectOption(option) {
    await this.refProjectSelect.sendKeys(option);
  }

  getRefProjectSelect() {
    return this.refProjectSelect;
  }

  async getRefProjectSelectedOption() {
    return this.refProjectSelect.element(by.css('option:checked')).getText();
  }

  async refUserPermissionSelectLastOption() {
    await this.refUserPermissionSelect.all(by.tagName('option')).last().click();
  }

  async refUserPermissionSelectOption(option) {
    await this.refUserPermissionSelect.sendKeys(option);
  }

  getRefUserPermissionSelect() {
    return this.refUserPermissionSelect;
  }

  async getRefUserPermissionSelectedOption() {
    return this.refUserPermissionSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await this.refUserSelectLastOption();
    await this.refProjectSelectLastOption();
    await this.refUserPermissionSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
