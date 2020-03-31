import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';
import { TYPE_A_REGISTER } from '../../../common/userTypeJourneyManager';

module.exports = {
  'tags': ['journey', 'forward-journey', 'device-tests', TYPE_A_REGISTER],

  'When I complete the journey as a type A user and I\'m registering an account': (client) => {
    JourneyRunner
      .runWith(client, profile)
      .assertComplete(client, profile);
  },

  'Then I see results': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();

    client.end();
  }
};
