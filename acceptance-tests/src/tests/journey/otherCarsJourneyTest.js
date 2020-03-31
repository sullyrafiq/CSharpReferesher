import otherCarsProfile from '../../profiles/otherCars';
import JourneyRunner from '../../common/journeyRunner';

module.exports = {
  'tags': ['journey', 'forward-journey', 'other-cars-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, otherCarsProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, otherCarsProfile);
  },

  'When I click the browser back button': (client) => {
    client.back().refresh();
  },

  'And I complete the journey again': (client) => {
    JourneyRunner.assertRepop(client, otherCarsProfile);
  },

  'Then I see results again': (client) => {
    JourneyRunner.assertComplete(client, otherCarsProfile);

    client.end();
  }
};
