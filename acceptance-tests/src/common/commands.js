import axeOptions from '../../axe.conf';

const COMMAND_DELAY = 50;

module.exports = {
  navigateAndWait() {
    return this
      .navigate()
      .waitForElementVisible('@main');
  },

  completePageWith(profile) {
    Object.keys(profile).forEach((question) => {
      this
        .waitForElementVisible(`@${question}`)
        .api.pause(COMMAND_DELAY);

      if (typeof this[question] === 'function') {
        // eslint-disable-next-line no-useless-call
        this[question].call(this, profile);
      } else if (typeof this[question] === 'undefined') {
        // eslint-disable-next-line no-console
        console.log(`\x1b[31m ✖ \x1b[0m${question} has no set function!`);
      } else {
        this[question].set.call(this, profile);
      }
    });

    return this;
  },

  completePageWithAndNavigateTo(profile, page) {
    return this
      .completePageWith(profile)
      .navigateTo(page);
  },

  navigateTo(page) {
    return this
      .proceed()
      .waitForUrlToContain(page);
  },

  proceed() {
    return this
      .waitForElementVisible('@continueToNextPage')
      .click('@continueToNextPage');
  },

  back() {
    return this
      .waitForElementVisible('@backToPreviousPage')
      .click('@backToPreviousPage');
  },

  assertUIWith(profile) {
    Object.keys(profile).forEach((question) => {
      if (typeof this[question] === 'object') {
        this[question].assert.call(this, profile);
      }
    });

    return this;
  },

  assertAccessibility() {
    return this
      .initAccessibility()
      .assert.accessibility('html', axeOptions);
  },

  assertValidation(selector, message) {
    this.expect.element(selector).text.to.equal(message).before(this.api.globals.waitForConditionTimeout);

    return this;
  }
};