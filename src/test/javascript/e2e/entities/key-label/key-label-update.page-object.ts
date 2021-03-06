import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class KeyLabelUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusNoElasticApp.keyLabel.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  valueInput: ElementFinder = element(by.css('input#key-label-value'));
  refTranslationKeySelect: ElementFinder = element(by.css('select#key-label-refTranslationKey'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return this.valueInput.getAttribute('value');
  }

  async refTranslationKeySelectLastOption() {
    await this.refTranslationKeySelect.all(by.tagName('option')).last().click();
  }

  async refTranslationKeySelectOption(option) {
    await this.refTranslationKeySelect.sendKeys(option);
  }

  getRefTranslationKeySelect() {
    return this.refTranslationKeySelect;
  }

  async getRefTranslationKeySelectedOption() {
    return this.refTranslationKeySelect.element(by.css('option:checked')).getText();
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
    await this.refTranslationKeySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
