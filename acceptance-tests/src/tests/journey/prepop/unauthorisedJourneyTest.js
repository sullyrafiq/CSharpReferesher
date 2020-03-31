import standardProfile from '../../../profiles/standard';
import JourneyRunner from '../../../common/journeyRunner';
import VALIDATION_MESSAGES from '../../../common/validationMessages';
import SessionManager from '../../../common/sessionManager';

module.exports = {
  'tags': ['journey', 'unauthorised-journey'],

  'When I complete the journey': (client) => {
    JourneyRunner.runWith(client, standardProfile);
  },

  'Then I see results': (client) => {
    JourneyRunner.assertComplete(client, standardProfile);
  },

  'When I reload the questionset without a pre-existing session': (client) => {
    SessionManager.signOut(client);

    client
      .pause(client.globals.commandDelay)
      .back()
      .refresh();
  },

  'And journey should not be prepopulated': (client) => {
    client.page.yourCarPage()
      .proceed()
      .assertValidation('@vehicleValidationMessage', VALIDATION_MESSAGES.noVehicle)
      .assertValidation('@carBoughtValidationMessage', VALIDATION_MESSAGES.noCarBought)
      .assertValidation('@registeredOwnerAndKeeperValidationMessage', VALIDATION_MESSAGES.noRegisteredOwnerAndKeeper)
      .assertValidation('@usageTypeValidationMessage', VALIDATION_MESSAGES.noUsageType)
      .assertValidation('@personalMilesPerYearValidationMessage', VALIDATION_MESSAGES.noPersonalMilesPerYear)
      .assertValidation('@daytimeStorageLocationValidationMessage', VALIDATION_MESSAGES.noDaytimeStorageLocation)
      .assertValidation('@overnightStorageLocationValidationMessage', VALIDATION_MESSAGES.noOvernightStorageLocation)
      .assertValidation('@anyOtherCarsValidationMessage', VALIDATION_MESSAGES.noAnyOtherCars);

    client.end();
  }
};
