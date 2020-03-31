import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';
import { TYPE_B_ALT_REGISTER } from '../../../common/userTypeJourneyManager';

module.exports = {
  'tags': ['journey', 'forward-journey', TYPE_B_ALT_REGISTER],

  'When I complete the journey as a type B user and I register a new account': (client) => {
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
