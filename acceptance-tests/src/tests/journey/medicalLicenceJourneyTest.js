import medicalLicenceProfile from '../../profiles/medicalLicence';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'medical-licence-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, medicalLicenceProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, medicalLicenceProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, medicalLicenceProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, medicalLicenceProfile);

    client.end();
  }
};
