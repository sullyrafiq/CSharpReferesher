import studentWithAdditionalOccupationProfile from '../../profiles/studentWithAdditionalOccupation';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'student-with-additional-occupation-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, studentWithAdditionalOccupationProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, studentWithAdditionalOccupationProfile);
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, studentWithAdditionalOccupationProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, studentWithAdditionalOccupationProfile);

    client.end();
  }
};
