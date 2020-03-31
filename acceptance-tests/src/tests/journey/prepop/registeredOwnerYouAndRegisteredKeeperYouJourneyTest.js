import profile from '../../../profiles/registeredOwnerYouAndRegisteredKeeperYou';
import JourneyRunner from '../../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'registered-owner-you-and-registered-keeper-you-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, profile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, profile);
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    const updatedProfile = JSON.parse(JSON.stringify(profile));

    updatedProfile.yourCar.registeredOwnerAndKeeper = true;
    delete updatedProfile.yourCar.registeredOwner;
    delete updatedProfile.yourCar.registeredKeeper;

    JourneyRunner.assertRepop(client, updatedProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, profile);

    client.end();
  }
};
