import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';
import { TYPE_B_ALT_FORGOTTEN_PASSWORD } from '../../../common/userTypeJourneyManager';

module.exports = {
  'tags': ['journey', 'forward-journey', TYPE_B_ALT_FORGOTTEN_PASSWORD],

  'When I complete the journey as a type B user and I\'ve forgotten the password for a different account': (client) => {
    JourneyRunner
      .runWith(client, profile)
      .assertComplete(client, Object.assign({}, profile, {
        aggResponse: Object.assign({}, profile.aggResponse, {
          isAuthenticated: false
        })
      }));
  },

  'Then I see results': (client) => {
    client.page.resultsPage()
      .waitForResultsComplete();

    client.end();
  }
};
