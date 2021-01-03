import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class LanguageUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusNoElasticApp.language.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  languageNameInput: ElementFinder = element(by.css('input#language-languageName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLanguageNameInput(languageName) {
    await this.languageNameInput.sendKeys(languageName);
  }

  async getLanguageNameInput() {
    return this.languageNameInput.getAttribute('value');
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
    await this.setLanguageNameInput('languageName');
    expect(await this.getLanguageNameInput()).to.match(/languageName/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
