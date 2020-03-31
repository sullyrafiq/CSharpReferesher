import commonCommands from '../common/commands';
import commonElements from '../common/elements';
import {inputQuestion, radioQuestion, selectQuestion} from '../common/questionTypeCommands';

const objectToQueryString = (object) => {
  const keys = Object.keys(object);

  if (keys.length) {
    return `?${keys.map(value => `${encodeURIComponent(value)}=${encodeURIComponent(object[value])}`).join('&')}`;
  }

  return '';
};

const selectors = {
  resultsTable: '.results-grid',
  annualPriceHeader: '.results-grid__header .results-grid__annual-price',
  annualPriceEntry: '.results-grid__entry .results-grid__annual-price .results-grid__annual-price--integer',
  monthlyPriceHeader: '.results-grid__header .results-grid__monthly-price',
  monthlyTotalPriceEntry: '.results-grid__entry .results-grid__monthly-price .results-grid__price-breakdown:last-of-type dd',
  donk: '.donk',
  expiredQuoteDonk: '#expired-quote-donk',
  policyStartDate: '#policyStartDate',
  resubmitExpiredQuoteButton: '#expired-quote-donk .btn--primary',
  controlPanel: '.control-panel',
  controlPanelCoverNeedsButton: '.control-panel__link--view',
  controlPanelFiltersButton: '.control-panel__btn--filter',
  resultFilters: '.results-filters__content',
  resultsFiltersCoverNeedsButton: '.results-filters__view-quote',
  coverNeedsSlider: '.cover-needs',
  coverNeedsSliderEditQuoteButton: '.cover-needs__intro .btn--edit',
  results: '.results-grid__secondary .results-grid__entry',
  providerImageGoToSite: '.results-grid__primary .results-grid__entry:not(.results-grid__entry--by-miles)[data-go-to-site=true] .results-grid__list',
  moreButtonClickToCall: '.results-grid__secondary .results-grid__entry:not(.results-grid__entry--by-miles)[data-click-to-call=true] .btn',
  policySlider: '#result-detail',
  goToSite: '#go-to-site .btn',
  clickToCall: '#click-to-call .btn',
  clickToCallReference: '.result-slider-left__reference',
  filterHeaders: '.results-filter__header:not(.results-filter__header--open)',
  paymentPreference: 'input[name=paymentPreference]',
  policyType: '#policyType',
  voluntaryExcess: '#voluntaryExcess',
  updateResultsModal: '.results-filters__update-modal .btn--primary',
  updateResultsFilters: '.results-filters__footer .btn',
  signInForm: '.sign-in-form',
  signInButton: '.sign-in-form__inner .btn--primary',
  signInEmailInput: '#email.sign-in-form__input',
  signInPasswordInput: '#password.sign-in-form__input',
  mileageUpdate: '.mileage-update__notification--amber',
  mileageUpdateEdit: '.mileage-update__edit',
  mileageUpdateGoBackLink: '.mileage-update__link',
  confirmMileageUpdate: '.mileage-update__confirm',
  mileageAccurate: '.mileage-update__notification--green',
  personalMilesPerYear: 'input[name=personalMilesPerYear]',
  header: '.navbar',
  footer: '.footer'
};

const questionCommands = {
  paymentPreference: radioQuestion('paymentPreference'),
  policyType: selectQuestion('policyType'),
  voluntaryExcess: selectQuestion('voluntaryExcess'),
  policyStartDate: selectQuestion('policyStartDate'),
  personalMilesPerYear: inputQuestion('personalMilesPerYear')
};

const actionCommands = {
  loadResults(query) {
    const resultsPageUrl = `${this.api.launch_url}${this.api.globals.context_path}/results/${objectToQueryString(query)}`;
    this.api.url(resultsPageUrl);
    return this;
  },
  waitForResultsComplete() {
    return this
      .waitForElementNotPresent('@donk', 65000)
      .waitForElementPresent('@results');
  },
  resubmitExpiredQuote(policyStartDate) {
    this.policyStartDate.set.call(this, {policyStartDate});
    this.click('@resubmitExpiredQuoteButton');
    return this;
  },
  triggerFilters() {
    this.api.isVisible(selectors.controlPanel, (result) => {
      if (result.value) {
        this
          .click('@controlPanelFiltersButton')
          .waitForElementVisible('@resultFilters');
      }
    });

    return this;
  },
  updateResults() {
    this.api.isVisible(selectors.updateResultsModal, (result) => {
      if (result.value) {
        this
          .waitForElementVisible('@updateResultsModal')
          .click('@updateResultsModal');
      } else {
        this
          .waitForElementVisible('@updateResultsFilters')
          .click('@updateResultsFilters');
      }
    });

    return this;
  },
  triggerYourCoverNeeds() {
    this.api.isVisible(selectors.controlPanel, (result) => {
      if (result.value) {
        this.click('@controlPanelCoverNeedsButton');
      } else {
        this.click('@resultsFiltersCoverNeedsButton');
      }
    });

    return this;
  },
  expandFilters() {
    this.api.perform((done) => {
      this.api.execute((filterHeadersSelector) => {
        [].forEach.call(document.querySelectorAll(filterHeadersSelector), element => element.click());
      }, [this.elements.filterHeaders.selector], done);
    });

    return this;
  },
  signIn(credentials) {
    this.waitForElementVisible('#email.sign-in-form__input')
      .clearAndSetValue(selectors.signInEmailInput, credentials.email)
      .clearAndSetValue(selectors.signInPasswordInput, credentials.password)
      .click('@signInButton');
    this.api.pause(1000);

    return this;
  },
  goToSite() {
    this.waitForElementVisible('@goToSite')
      .click('@goToSite');

    return this;
  }
};

module.exports = {
  commands: [commonCommands, questionCommands, actionCommands],
  elements: [
    commonElements,
    selectors
  ]
};
