import manualVehicleProfile from '../../profiles/manualVehicle';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'manual-vehicle-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, manualVehicleProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, manualVehicleProfile);
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, manualVehicleProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, manualVehicleProfile);

    client.end();
  }
};
