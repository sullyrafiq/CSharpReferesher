import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';
import {TYPE_A_SIGN_IN} from '../../../common/userTypeJourneyManager';

const updatedProfile = JSON.parse(JSON.stringify(profile));
updatedProfile.yourPolicy.contactByEmail = true;
updatedProfile.aggResponse.payload.policyHolder.contactByEmail = true;

module.exports = {
  'tags': ['journey', 'forward-journey', 'device-tests', TYPE_A_SIGN_IN],

  'When I complete the journey as a type A user and I\'m signing in': (client) => {
    JourneyRunner
      .runWith(client, updatedProfile)
      .assertComplete(client, updatedProfile);
  },

  'Then I see results': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();

    client.end();
  }
};
