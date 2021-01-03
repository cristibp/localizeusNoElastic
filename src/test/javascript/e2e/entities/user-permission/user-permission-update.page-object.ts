import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class UserPermissionUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusNoElasticApp.userPermission.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeSelect: ElementFinder = element(by.css('select#user-permission-type'));
  refUserSelect: ElementFinder = element(by.css('select#user-permission-refUser'));
  refProjectSelect: ElementFinder = element(by.css('select#user-permission-refProject'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect.all(by.tagName('option')).last().click();
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
    await waitUntilDisplayed(this.saveButton);
    await this.typeSelectLastOption();
    await this.refUserSelectLastOption();
    await this.refProjectSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
