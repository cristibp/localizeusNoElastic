import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class DiscussionUpdatePage {
  pageTitle: ElementFinder = element(by.id('localizeusNoElasticApp.discussion.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  valueInput: ElementFinder = element(by.css('input#discussion-value'));
  refProjectSelect: ElementFinder = element(by.css('select#discussion-refProject'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return this.valueInput.getAttribute('value');
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
    await this.setValueInput('value');
    expect(await this.getValueInput()).to.match(/value/);
    await this.refProjectSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
