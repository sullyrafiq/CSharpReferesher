import standard from '../../../profiles/standard';

const VARIATION_2 = '17544311571';

module.exports = {
  'tags': ['journey', 'experiment', 'named-driver-experience-experiment'],

  'When I enter the experiment': (client) => {
    const experimentUrl = `${client.page.yourCarPage().url()}?optimizely_x=${VARIATION_2}&optimizely_token=PUBLIC`;

    // eslint-disable-next-line no-console
    console.log('Experiment URL: ', experimentUrl);

    client
      .url(experimentUrl)
      .page.yourCarPage().waitForElementVisible('@main', 60000)
      .fetchSpy();
  },

  'And I navigate to Your Policy page': (client) => {
    client.page.yourCarPage()
      .completePageWithAndNavigateTo(standard.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(standard.yourDetails, 'your-policy');
  },

  'Then I should see a card style marketing preferences section rendered': (client) => {
    client.page.yourPolicyPage().waitForElementVisible('@communicationPreferencesCardStyle');
  },

  'And then I navigate to Results page': (client) => {
    client.page.yourPolicyPage()
      .completePageWith(standard.yourPolicy)
      .proceed();
  },

  'Then I see results': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();

    client.end();
  }
};
