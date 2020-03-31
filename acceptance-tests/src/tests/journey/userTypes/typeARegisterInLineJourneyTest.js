import profile from '../../../profiles/live';
import JourneyRunner from '../../../common/journeyRunner';
import { TYPE_A_REGISTER_INLINE } from '../../../common/userTypeJourneyManager';

module.exports = {
  'tags': ['journey', 'forward-journey', TYPE_A_REGISTER_INLINE],

  'When I complete the journey as a type A user and I\'m registering an account inline': (client) => {
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
