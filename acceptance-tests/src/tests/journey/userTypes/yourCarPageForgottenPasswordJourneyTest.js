import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';
import {TYPE_A_SIGN_IN_INLINE_FORGOTTEN_PASSWORD_UPFRONT} from '../../../common/userTypeJourneyManager';

module.exports = {
  'tags': ['journey', 'forward-journey', TYPE_A_SIGN_IN_INLINE_FORGOTTEN_PASSWORD_UPFRONT],

  'When I complete the journey': (client) => {
    JourneyRunner
      .runWith(client, profile)
      .assertComplete(client, Object.assign({}, profile, {
        aggResponse: Object.assign({}, profile.aggResponse, {
          isAuthenticated: false
        })
      }));
  },

  'Then I see results': (client) => {
    client.page.resultsPage().waitForResultsComplete();

    client.end();
  }
};
