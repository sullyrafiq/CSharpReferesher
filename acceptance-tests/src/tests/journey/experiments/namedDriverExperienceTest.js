import standard from '../../../profiles/standard';

const VARIATION_1 = '16965861084';

const updatedStandard = JSON.parse(JSON.stringify(standard));

const numberOfYearsNoClaims = 0;
const namedDriverExperienceTypeId = 2;
const namedDriverExperienceType = 2;
const numberOfYearsNamedDriverExperience = 3;
const legalCover = false;
const personalInjury = false;
const breakdownCover = false;
const courtesyCar = false;
const iddQuestions = {legalCover, personalInjury, breakdownCover, courtesyCar};

updatedStandard.yourPolicy = Object.assign(updatedStandard.yourPolicy, {numberOfYearsNoClaims, namedDriverExperienceTypeId, numberOfYearsNamedDriverExperience});
updatedStandard.yourPolicy = Object.assign(updatedStandard.yourPolicy, iddQuestions);
updatedStandard.aggResponse.payload.policyHolder = Object.assign(updatedStandard.aggResponse.payload.policyHolder, {numberOfYearsNoClaims, namedDriverExperienceType, numberOfYearsNamedDriverExperience});
updatedStandard.aggResponse.payload.policy = Object.assign(updatedStandard.aggResponse.payload.policy, iddQuestions);

module.exports = {
  'tags': ['journey', 'experiment', 'named-driver-experience-experiment'],

  'When I enter the experiment': (client) => {
    const experimentUrl = `${client.page.yourCarPage().url()}?optimizely_x=${VARIATION_1}&optimizely_token=PUBLIC`;

    // eslint-disable-next-line no-console
    console.log('Experiment URL: ', experimentUrl);

    client
      .url(experimentUrl)
      .page.yourCarPage().waitForElementVisible('@main', 60000)
      .fetchSpy();
  },

  'And I proceed to the Results page': (client) => {
    client.page.yourCarPage()
      .completePageWithAndNavigateTo(updatedStandard.yourCar, 'your-details');

    client.page.yourDetailsPage()
      .completePageWithAndNavigateTo(updatedStandard.yourDetails, 'your-policy');

    client.page.yourPolicyPage()
      .completePageWith(updatedStandard.yourPolicy)
      .proceed();
  },

  'Then I see results': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();

    client.end();
  }
};
