import removeClaimsProfile from '../../profiles/removeClaims';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'remove-claims-journey'],

  'When I complete the journey with 2 claims and remove the first': (client) => {
    JourneyRunner.runWith(client, removeClaimsProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, removeClaimsProfile);
  },

  'When I click the browser back button': (client) => {
    client.back();
  },

  'And I complete the journey again': (client) => {
    const updatedProfile = JSON.parse(JSON.stringify(removeClaimsProfile));

    updatedProfile.yourDetails.claims.shift();

    JourneyRunner.assertRepop(client, updatedProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, removeClaimsProfile);

    client.end();
  }
};
