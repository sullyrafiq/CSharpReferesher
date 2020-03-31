import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';

const VARIATION_1 = '17254902200';
let enquiryId = '';

const updatedProfile = JSON.parse(JSON.stringify(profile));

const personalMilesPerYearEstimated = false;
const personalMilesPerYear = 2000;

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
      .waitForElementPresent('@mileageUpdateEdit');
  },

  'Then I click on the edit button': (client) => {
    client.page.resultsPage().click('@mileageUpdateEdit');
  },

  'Then I change the value for personal miles per year and click confirm': (client) => {
    client.page.resultsPage()
      .completePageWith({
        personalMilesPerYear: 5600
      })
      .click('@confirmMileageUpdate');
  },

  'Then it should trigger an enquiry re-submission': (client) => {
    client.page.resultsPage().waitForResultsComplete();
  },

  'Then I should see the confirm mileage update notification box': (client) => {
    client.page.resultsPage().waitForResultsComplete();

    client.pause(20000);

    client.page.resultsPage().waitForElementPresent('@mileageAccurate');
  },

  'Then I click on the go back to previous mileage button': (client) => {
    client.page.resultsPage().click('@mileageUpdateGoBackLink');
  },

  'Then I should see the orginal mileage update notification box': (client) => {
    client.page.resultsPage().waitForResultsComplete();

    client.pause(20000);

    client.page.resultsPage().waitForElementPresent('@mileageUpdate');

    client.end();
  }
};
