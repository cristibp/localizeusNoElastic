import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TranslationKeyUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusNoElasticApp.translationKey.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#translation-key-name'));
  fallbackValueInput: ElementFinder = element(by.css('input#translation-key-fallbackValue'));
  refProjectSelect: ElementFinder = element(by.css('select#translation-key-refProject'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setFallbackValueInput(fallbackValue) {
    await this.fallbackValueInput.sendKeys(fallbackValue);
  }

  async getFallbackValueInput() {
    return this.fallbackValueInput.getAttribute('value');
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFallbackValueInput('fallbackValue');
    expect(await this.getFallbackValueInput()).to.match(/fallbackValue/);
    await this.refProjectSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
