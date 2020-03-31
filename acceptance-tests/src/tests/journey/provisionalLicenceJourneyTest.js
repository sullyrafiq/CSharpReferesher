import provisionalLicenceProfile from '../../profiles/provisionalLicence';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'provisional-licence-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, provisionalLicenceProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, provisionalLicenceProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, provisionalLicenceProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, provisionalLicenceProfile);

    client.end();
  }
};
