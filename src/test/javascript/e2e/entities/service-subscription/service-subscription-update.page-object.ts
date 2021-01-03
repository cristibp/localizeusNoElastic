import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ServiceSubscriptionUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusNoElasticApp.serviceSubscription.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  startInput: ElementFinder = element(by.css('input#service-subscription-start'));
  endInput: ElementFinder = element(by.css('input#service-subscription-end'));
  paymentTypeSelect: ElementFinder = element(by.css('select#service-subscription-paymentType'));
  refCompanySelect: ElementFinder = element(by.css('select#service-subscription-refCompany'));
  refPlanSelect: ElementFinder = element(by.css('select#service-subscription-refPlan'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStartInput(start) {
    await this.startInput.sendKeys(start);
  }

  async getStartInput() {
    return this.startInput.getAttribute('value');
  }

  async setEndInput(end) {
    await this.endInput.sendKeys(end);
  }

  async getEndInput() {
    return this.endInput.getAttribute('value');
  }

  async setPaymentTypeSelect(paymentType) {
    await this.paymentTypeSelect.sendKeys(paymentType);
  }

  async getPaymentTypeSelect() {
    return this.paymentTypeSelect.element(by.css('option:checked')).getText();
  }

  async paymentTypeSelectLastOption() {
    await this.paymentTypeSelect.all(by.tagName('option')).last().click();
  }
  async refCompanySelectLastOption() {
    await this.refCompanySelect.all(by.tagName('option')).last().click();
  }

  async refCompanySelectOption(option) {
    await this.refCompanySelect.sendKeys(option);
  }

  getRefCompanySelect() {
    return this.refCompanySelect;
  }

  async getRefCompanySelectedOption() {
    return this.refCompanySelect.element(by.css('option:checked')).getText();
  }

  async refPlanSelectLastOption() {
    await this.refPlanSelect.all(by.tagName('option')).last().click();
  }

  async refPlanSelectOption(option) {
    await this.refPlanSelect.sendKeys(option);
  }

  getRefPlanSelect() {
    return this.refPlanSelect;
  }

  async getRefPlanSelectedOption() {
    return this.refPlanSelect.element(by.css('option:checked')).getText();
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
    await this.setStartInput('01-01-2001');
    expect(await this.getStartInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setEndInput('01-01-2001');
    expect(await this.getEndInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.paymentTypeSelectLastOption();
    await this.refCompanySelectLastOption();
    await this.refPlanSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
