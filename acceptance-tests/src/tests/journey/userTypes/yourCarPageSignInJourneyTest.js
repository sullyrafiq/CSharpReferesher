import JourneyRunner from '../../../common/journeyRunner';
import {TYPE_A_SIGN_IN_INLINE_UPFRONT} from '../../../common/userTypeJourneyManager';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const policyStartDate = tomorrow.toISOString().slice(0, 10);

module.exports = {
  'tags': ['journey', 'forward-journey', TYPE_A_SIGN_IN_INLINE_UPFRONT],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, {
      yourCar: {},
      yourDetails: {
        hasDrivingOffences: false
      },
      yourPolicy: {
        hasAdditionalDriver: false,
        policyStartDate
      }
    });
  },

  'Then I see results': (client) => {
    // eslint-disable-next-line no-undefined
    JourneyRunner.assertComplete(client, undefined, false);

    client.end();
  }
};
