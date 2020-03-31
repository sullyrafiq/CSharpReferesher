import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';

const VARIATION_1 = '17254902200';
let enquiryId = '';

const updatedProfile = JSON.parse(JSON.stringify(profile));

const personalMilesPerYearEstimated = false;
const personalMilesPerYear = 9200;

updatedProfile.yourCar = Object.assign(updatedProfile.yourCar, {personalMilesPerYearEstimated, personalMilesPerYear});
updatedProfile.aggResponse.payload.vehicle = Object.assign(updatedProfile.aggResponse.payload.vehicle, {personalMilesPerYear});

module.exports = {
  'tags': ['journey', 'experiment', 'mileage-update-experiment'],

  'When I complete the journey': (client) => {
    JourneyRunner.runExperimentWith(client, updatedProfile, VARIATION_1);
  },

  'And I get on the results page': (client) => {
    JourneyRunner.assertComplete(client, updatedProfile);

    client.page.resultsPage().waitForResultsComplete();
  },

  'Then I should not see the mileage update notification box': (client) => {
    client.page.resultsPage().waitForElementNotPresent('@mileageUpdateEdit');
  },

  'When I refresh the results page': (client) => {
    client.url((result) => {
      enquiryId = result.value.split('=')[1];
      const query = {enquiryId, optimizely_x: VARIATION_1, optimizely_token: 'PUBLIC'};

      client.page.resultsPage().loadResults(query);
    });
  },

  'Then I should see the mileage update notification box': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete()
      .waitForElementPresent('@mileageAccurate');

    client.end();
  }
};
