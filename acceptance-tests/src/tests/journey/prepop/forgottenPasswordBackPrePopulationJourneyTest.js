import standardProfile from '../../../profiles/standard';
import JourneyRunner from '../../../common/journeyRunner';
import {TYPE_B_FORGOTTEN_PASSWORD} from '../../../common/userTypeJourneyManager';

module.exports = {
  'tags': ['journey', 'edit-questions-journey', TYPE_B_FORGOTTEN_PASSWORD],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, standardProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, Object.assign({}, standardProfile, {
      aggResponse: Object.assign({}, standardProfile.aggResponse, {
        isAuthenticated: false
      })
    }));
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, standardProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, Object.assign({}, standardProfile, {
      aggResponse: Object.assign({}, standardProfile.aggResponse, {
        isAuthenticated: false
      })
    }));

    client.end();
  }
};
