import standardProfile from '../../profiles/standard';
import VALIDATION_MESSAGES from '../../common/validationMessages';

module.exports = {
  'tags': ['your-car', 'validation'],

  'Given I navigate to your car page': (client) => {
    client.page.yourCarPage().navigateAndWait();
  },

  'When I leave all questions unanswered and attempt to proceed': (client) => {
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
  },

  'When I select "No" for being the registered owner and keeper and attempt to proceed': (client) => {
    client.page.yourCarPage()
      .completePageWith({ registeredOwnerAndKeeper: false })
      .proceed()
      .assertValidation('@registeredOwnerValidationMessage', VALIDATION_MESSAGES.noRegisteredOwner)
      .assertValidation('@registeredKeeperValidationMessage', VALIDATION_MESSAGES.noRegisteredKeeper);
  },

  'When I enter an invalid personal miles per year and attempt to proceed': (client) => {
    client.page.yourCarPage()
      .completePageWith({ personalMilesPerYear: 499 })
      .proceed()
      .assertValidation('@personalMilesPerYearValidationMessage', VALIDATION_MESSAGES.invalidPersonalMilesPerYear);
  },

  'When I select a car and attempt to proceed': (client) => {
    client.page.yourCarPage()
      .completePageWith({
        registrationNumber: standardProfile.yourCar.registrationNumber,
        selectedVehicle: standardProfile.yourCar.vehicle,
        vehicle: standardProfile.yourCar.vehicle
      })
      .proceed()
      .assertValidation('@detailsAssumptionValidationMessage', VALIDATION_MESSAGES.detailsAssumption)
      .assertValidation('@numberOfSeatsValidationMessage', VALIDATION_MESSAGES.numberOfSeats)
      .assertValidation('@isVehicleModifiedValidationMessage', VALIDATION_MESSAGES.noIsVehicleModified)
      .assertValidation('@vehicleValueValidationMessage', VALIDATION_MESSAGES.noVehicleValue);
  },

  'When I select "Other" for alarm type and "Yes" to car imported and attempt to proceed': (client) => {
    client.page.yourCarPage()
      .completePageWith({ detailsAssumption: false, imported: true, securityDeviceId: '' })
      .proceed()
      .assertValidation('@securityDeviceIdValidationMessage', VALIDATION_MESSAGES.securityDeviceId)
      .assertValidation('@importedValidationMessage', VALIDATION_MESSAGES.importTypeId);

    client.end();
  }
};
