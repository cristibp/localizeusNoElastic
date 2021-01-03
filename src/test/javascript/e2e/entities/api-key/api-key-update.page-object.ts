import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ApiKeyUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusNoElasticApp.apiKey.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  valueInput: ElementFinder = element(by.css('input#api-key-value'));
  startDateInput: ElementFinder = element(by.css('input#api-key-startDate'));
  endDateInput: ElementFinder = element(by.css('input#api-key-endDate'));
  refUserSelect: ElementFinder = element(by.css('select#api-key-refUser'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return this.valueInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return this.endDateInput.getAttribute('value');
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
    await this.setValueInput('value');
    expect(await this.getValueInput()).to.match(/value/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStartDateInput('01-01-2001');
    expect(await this.getStartDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setEndDateInput('01-01-2001');
    expect(await this.getEndDateInput()).to.eq('2001-01-01');
    await this.refUserSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
