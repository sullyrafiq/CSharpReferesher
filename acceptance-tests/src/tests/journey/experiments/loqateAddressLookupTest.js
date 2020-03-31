import loqate from '../../../profiles/loqate';
import VALIDATION_MESSAGES from '../../../common/validationMessages';

const VARIATION_1 = '17012664699';

module.exports = {
  'tags': ['journey', 'experiment', 'loqate-address-lookup-experiment'],

  'When I enter the experiment': (client) => {
    const experimentUrl = `${client.page.yourCarPage().url()}?optimizely_x=${VARIATION_1}&optimizely_token=PUBLIC`;

    // eslint-disable-next-line no-console
    console.log('Experiment URL: ', experimentUrl);

    client
      .url(experimentUrl)
      .page.yourCarPage().waitForElementVisible('@main', 60000)
      .fetchSpy();
  },

  'And I fill in Your Car with the loqate profile': (client) => {
    client.page.yourCarPage()
      .completePageWithAndNavigateTo(loqate.yourCar, 'your-details');
  },

  'When I try to proceed to Your Policy page': (client) => {
    client.page.yourDetailsLoqatePage()
      .proceed();
  },

  'Then I should validate on the loqate question': (client) => {
    client.page.yourDetailsLoqatePage()
      .assertValidation('@loqateValidationMessage', VALIDATION_MESSAGES.noLoqateAddress);
  },

  'And then I fill in Your Details and Your Policy with the loqate profile': (client) => {
    client.page.yourDetailsLoqatePage()
      .completePageWithAndNavigateTo(loqate.yourDetails, 'your-policy');

    client.page.yourPolicyPage()
      .completePageWith(loqate.yourPolicy)
      .proceed();
  },

  'Then I see results': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();

    client.end();
  }
};
