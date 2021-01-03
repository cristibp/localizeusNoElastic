import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PlanUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusNoElasticApp.plan.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#plan-name'));
  costInCentsInput: ElementFinder = element(by.css('input#plan-costInCents'));
  keyLimitInput: ElementFinder = element(by.css('input#plan-keyLimit'));
  callsLimitInput: ElementFinder = element(by.css('input#plan-callsLimit'));
  typeSelect: ElementFinder = element(by.css('select#plan-type'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setCostInCentsInput(costInCents) {
    await this.costInCentsInput.sendKeys(costInCents);
  }

  async getCostInCentsInput() {
    return this.costInCentsInput.getAttribute('value');
  }

  async setKeyLimitInput(keyLimit) {
    await this.keyLimitInput.sendKeys(keyLimit);
  }

  async getKeyLimitInput() {
    return this.keyLimitInput.getAttribute('value');
  }

  async setCallsLimitInput(callsLimit) {
    await this.callsLimitInput.sendKeys(callsLimit);
  }

  async getCallsLimitInput() {
    return this.callsLimitInput.getAttribute('value');
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCostInCentsInput('5');
    expect(await this.getCostInCentsInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setKeyLimitInput('5');
    expect(await this.getKeyLimitInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCallsLimitInput('5');
    expect(await this.getCallsLimitInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.typeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
