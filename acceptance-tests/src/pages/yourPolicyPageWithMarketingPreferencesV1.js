import commonCommands from '../common/commands';
import {inputQuestion, radioQuestion, selectQuestion} from '../common/questionTypeCommands';
import commonElements from '../common/elements';

const selectors = {
  hasAdditionalDriver: '#hasAdditionalDriverQuestion',
  hasAdditionalDriverValidationMessage: '#hasAdditionalDriverQuestion .warning__message',
  additionalDriver: '#additionalDriverQuestion',
  additionalDrivers: '#additionalDriverQuestion',
  addAdditionalDriver: '#additionalDriverQuestion .btn--subprimary',
  additionalDriverValidationMessage: '#additionalDriverQuestion .warning__message',
  mainDriver: '#mainDriverQuestion',
  mainDriverValidationMessage: '#mainDriverQuestion .warning__message',
  policyTypeId: '#policyTypeIdQuestion',
  policyTypeIdValidationMessage: '#policyTypeIdQuestion .warning__message',
  voluntaryExcess: '#voluntaryExcessQuestion',
  legalCover: '#legalCoverQuestion',
  legalCoverValidationMessage: '#legalCoverQuestion .warning__message',
  personalInjury: '#personalInjuryQuestion',
  personalInjuryValidationMessage: '#personalInjuryQuestion .warning__message',
  breakdownCover: '#breakdownCoverQuestion',
  breakdownCoverValidationMessage: '#breakdownCoverQuestion .warning__message',
  courtesyCar: '#courtesyCarQuestion',
  courtesyCarValidationMessage: '#courtesyCarQuestion .warning__message',
  insuranceDeclined: '#insuranceDeclinedQuestion',
  insuranceDeclinedValidationMessage: '#insuranceDeclinedQuestion .warning__message',
  numberOfYearsNoClaims: '#numberOfYearsNoClaimsQuestion select',
  numberOfYearsNoClaimsValidationMessage: '#numberOfYearsNoClaimsQuestion .warning__message',
  namedDriverExperienceTypeId: '#namedDriverExperienceTypeIdQuestion',
  numberOfYearsNamedDriverExperience: '#numberOfYearsNamedDriverExperienceQuestion select',
  protectedNoClaims: '#protectedNoClaimsQuestion',
  paymentPreference: '#paymentPreferenceQuestion',
  paymentPreferenceValidationMessage: '#paymentPreferenceQuestion .warning__message',
  policyStartDate: '#policyStartDateQuestion select',
  policyStartDateValidationMessage: '#policyStartDateQuestion .warning__message',
  email: '#emailQuestion input',
  emailValidationMessage: '#emailQuestion .warning__message',
  confirmationEmail: '#confirmationEmailQuestion input',
  confirmationEmailValidationMessage: '#confirmationEmailQuestion .warning__message',
  password: '#passwordQuestion input[type="password"]',
  passwordValidationMessage: '#passwordQuestion .warning__message',
  confirmationPassword: '#confirmationPasswordQuestion input',
  confirmationPasswordValidationMessage: '#confirmationPasswordQuestion .warning__message',
  contactByEmail: '#contactByEmailQuestion',
  signIn: '.signin-account .btn--subprimary',
  register: '.create-account .btn--subprimary',
  forgottenPassword: '.signin-account .btn--link',
  forgottenPasswordNotification: '.signin-account .notification',
  welcomeBackHeader: '.signin-account .form__header',
  signedInSuccessNotification: '.account-questions .notification--green',
  accountCreatedSuccessNotification: '.notification',
  blurTarget: '#emailQuestion button.tooltip__link',
  communicationPreferences: '.communication-preferences',
  communicationPreferencesCardStyle: '.card',
  header: '.navbar'
};

const questionCommands = {
  hasAdditionalDriver: radioQuestion('hasAdditionalDriver'),
  additionalDrivers: {
    assert(profile) {
      this.expect.elements('.additional-drivers-question .selection-preview').count.to.equal(profile.additionalDrivers.length);

      profile.additionalDrivers.forEach((driver, i) => {
        this.click(`.additional-drivers-question__driver:nth-child(${i + 1}) .selection-preview__edit-item`)
          .api.page.additionalDriverPage()
          .waitForUrlToContain('additional-driver')
          .assertUIWith(driver)
          .back()
          .waitForUrlToContain('your-policy');
      });

      return this;
    },
    set(profile) {
      profile.additionalDrivers.forEach((driver) => {
        this.addAdditionalDriver()
          .api.page.additionalDriverPage()
          .completePageWithAndNavigateTo(driver, 'your-policy');
      });

      return this;
    }
  },
  mainDriver: radioQuestion('mainDriver'),
  policyTypeId: radioQuestion('policyTypeId'),
  legalCover: radioQuestion('legalCover'),
  personalInjury: radioQuestion('personalInjury'),
  breakdownCover: radioQuestion('breakdownCover'),
  courtesyCar: radioQuestion('courtesyCar'),
  voluntaryExcess: selectQuestion('voluntaryExcess'),
  insuranceDeclined: radioQuestion('insuranceDeclined'),
  numberOfYearsNoClaims: selectQuestion('numberOfYearsNoClaims'),
  namedDriverExperienceTypeId: radioQuestion('namedDriverExperienceTypeId'),
  numberOfYearsNamedDriverExperience: selectQuestion('numberOfYearsNamedDriverExperience'),
  protectedNoClaims: radioQuestion('protectedNoClaims'),
  paymentPreference: radioQuestion('paymentPreference'),
  policyStartDate: selectQuestion('policyStartDate'),
  email(profile) {
    return this.clearAndSetValue(selectors.email, profile.email)
      .click('@blurTarget');
  },
  confirmationEmail(profile) {
    return this.clearAndSetValue(selectors.confirmationEmail, profile.confirmationEmail)
      .click('@blurTarget');
  },
  password: inputQuestion('password').set,
  confirmationPassword: inputQuestion('confirmationPassword').set,
  contactByEmail: radioQuestion('contactByEmail')
};

const actionCommands = {
  addAdditionalDriver() {
    this
      .waitForElementVisible('@addAdditionalDriver')
      .api.pause(this.api.globals.commandDelay);

    return this
      .click('@addAdditionalDriver')
      .waitForUrlToContain('additional-driver');
  },
  registerInline({email, confirmationEmail = email, password, confirmationPassword = password}) {
    this
      .completePageWith({email, confirmationEmail})
      .waitForElementVisible('@password')
      .completePageWith({password, confirmationPassword})
      .click('@register')
      .waitForElementVisible('@accountCreatedSuccessNotification')
      .api.pause(this.api.globals.commandDelay);

    return this;
  },
  register(profile) {
    this
      .completePageWith(profile)
      .api.pause(this.api.globals.commandDelay);

    return this;
  },
  signInInline(profile, fail = false) {
    this
      .completePageWith({email: profile.email})
      .waitForElementVisible('@welcomeBackHeader')
      .completePageWith({password: profile.password})
      .click('@signIn');

    return fail ? this : this.waitForElementVisible('@signedInSuccessNotification');
  },
  signIn(profile) {
    return this
      .completePageWith({email: profile.email})
      .waitForElementVisible('@welcomeBackHeader')
      .completePageWith({password: profile.password});
  },
  forgottenPassword(profile) {
    return this
      .completePageWith({email: profile.email})
      .waitForElementVisible('@welcomeBackHeader')
      .click('@forgottenPassword');
  }
};

module.exports = {
  commands: [commonCommands, questionCommands, actionCommands],
  url() {
    return `${this.api.launch_url}${this.api.globals.context_path}/questionset/your-policy`;
  },
  elements: [
    commonElements,
    selectors
  ]
};
