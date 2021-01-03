import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProjectHistoryUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusNoElasticApp.projectHistory.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  actionSelect: ElementFinder = element(by.css('select#project-history-action'));
  oldValueInput: ElementFinder = element(by.css('input#project-history-oldValue'));
  newValueInput: ElementFinder = element(by.css('input#project-history-newValue'));
  refUserSelect: ElementFinder = element(by.css('select#project-history-refUser'));
  refTranslationKeySelect: ElementFinder = element(by.css('select#project-history-refTranslationKey'));
  refTranslationSelect: ElementFinder = element(by.css('select#project-history-refTranslation'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setActionSelect(action) {
    await this.actionSelect.sendKeys(action);
  }

  async getActionSelect() {
    return this.actionSelect.element(by.css('option:checked')).getText();
  }

  async actionSelectLastOption() {
    await this.actionSelect.all(by.tagName('option')).last().click();
  }
  async setOldValueInput(oldValue) {
    await this.oldValueInput.sendKeys(oldValue);
  }

  async getOldValueInput() {
    return this.oldValueInput.getAttribute('value');
  }

  async setNewValueInput(newValue) {
    await this.newValueInput.sendKeys(newValue);
  }

  async getNewValueInput() {
    return this.newValueInput.getAttribute('value');
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

  async refTranslationSelectLastOption() {
    await this.refTranslationSelect.all(by.tagName('option')).last().click();
  }

  async refTranslationSelectOption(option) {
    await this.refTranslationSelect.sendKeys(option);
  }

  getRefTranslationSelect() {
    return this.refTranslationSelect;
  }

  async getRefTranslationSelectedOption() {
    return this.refTranslationSelect.element(by.css('option:checked')).getText();
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
    await this.actionSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setOldValueInput('oldValue');
    expect(await this.getOldValueInput()).to.match(/oldValue/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNewValueInput('newValue');
    expect(await this.getNewValueInput()).to.match(/newValue/);
    await this.refUserSelectLastOption();
    await this.refTranslationKeySelectLastOption();
    await this.refTranslationSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
