import commonCommands from '../common/commands';
import {radioQuestion, selectQuestion, inputQuestion} from '../common/questionTypeCommands';
import commonElements from '../common/elements';
import vehicleElements from '../sections/your-car/vehicle';
import manualVehicleElements from '../sections/your-car/manualVehicle';
import detailAssumptionsElements from '../sections/your-car/detailAssumptions';

const selectors = {
  registrationNumber: 'input[name=registrationNumber]',
  selectedVehicle: '#vehicleSelectQuestion',
  isVehicleModified: '#isVehicleModifiedQuestion',
  isVehicleModifiedValidationMessage: '#isVehicleModifiedQuestion .warning__message',
  modifications: '#modificationCategoryQuestion',
  modificationCategory: 'select[name="modificationCategory"]',
  modificationType: 'select[name="modificationType"]',
  modificationsPreview: '#modificationsPreviewQuestion',
  addAnotherModification: '#modificationsPreviewQuestion .btn--subprimary',
  vehicleValue: 'input[name=vehicleValue]',
  vehicleValueValidationMessage: '#vehicleValueQuestion .warning__message',
  carBought: '#carBoughtQuestion',
  carBoughtValidationMessage: '#carBoughtQuestion .warning__message',
  monthCarBought: 'select[name="monthCarBought"]',
  yearCarBought: 'select[name="yearCarBought"]',
  dateCarBoughtConfirm: '#monthCarBoughtQuestion .btn--primary',
  registeredOwnerAndKeeper: '#registeredOwnerAndKeeperQuestion',
  registeredOwnerAndKeeperTooltip: '#registeredOwnerAndKeeperQuestion .tooltip__link',
  registeredOwnerAndKeeperTooltipBody: '#registeredOwnerAndKeeperQuestion .tooltip__body--opened',
  registeredOwnerAndKeeperValidationMessage: '#registeredOwnerAndKeeperQuestion .warning__message',
  registeredOwner: '#registeredOwnerQuestion',
  registeredOwnerValidationMessage: '#registeredOwnerQuestion .warning__message',
  registeredKeeper: '#registeredKeeperQuestion',
  registeredKeeperValidationMessage: '#registeredKeeperQuestion .warning__message',
  usageType: '#usageTypeQuestion',
  usageTypeValidationMessage: '#usageTypeQuestion .warning__message',
  businessUsageType: '#businessUsageTypeQuestion',
  businessUsageTypeValidationMessage: '#businessUsageTypeQuestion .warning__message',
  businessMilesPerYear: 'input[name=businessMilesPerYear]',
  businessMilesPerYearValidationMessage: '#businessMilesPerYearQuestion .warning__message',
  personalMilesPerYear: 'input[name=personalMilesPerYear]',
  personalMilesPerYearValidationMessage: '#personalMilesPerYearQuestion .warning__message',
  personalMilesPerYearEstimated: '#mileageEstimateQuestion',
  personalMilesPerYearEstimatedConfirm: '#mileageEstimateQuestion .btn--primary',
  personalMilesPerYearEstimatedEdit: '#mileageEstimateQuestion .estimated-mileage--edit',
  daytimeStorageLocation: '#daytimeStorageLocationQuestion',
  daytimeStorageLocationValidationMessage: '#daytimeStorageLocationQuestion .warning__message',
  daytimeStorageLocationOther: 'select[name=daytimeStorageLocationOther]',
  overnightStorageLocation: '#overnightStorageLocationQuestion',
  overnightStorageLocationValidationMessage: '#overnightStorageLocationQuestion .warning__message',
  overnightStorageLocationOther: 'select[name=overnightStorageLocationOther]',
  anyOtherCars: '#anyOtherCarsQuestion',
  anyOtherCarsValidationMessage: '#anyOtherCarsQuestion .warning__message',
  anyOtherCarsId: '#anyOtherCarsIdQuestion',
  email: '#emailQuestion input',
  blurTarget: '#emailQuestion .account-questions__next-button',
  password: '#passwordQuestion input[type="password"]',
  signInLink: '.prepop-sign-in-question__welcome-btn',
  signInConfirm: '.signin-account  .btn--subprimary',
  signInConfirmed: '.prepop-sign-in-question__pre-popped-notification',
  forgottenPasswordLink: '.prepop-sign-in-question .btn--push',
  forgottenPasswordConfirmed: '.prepop-sign-in-question .notification'
};

const questionCommands = {
  registrationNumber(profile) {
    return inputQuestion('registrationNumber').set.call(this, profile)
      .click('@findVehicle');
  },
  selectedVehicle() {
    return this
      .waitForElementVisible('@vehicleList')
      .click('@vehicleListSecondItem');
  },
  vehicle: {
    assert(profile) {
      this.assert.containsText('@selectedVehiclePreviewTitle', profile.vehicle);
    },
    set() {
      return this;
    }
  },
  detailsAssumption: {
    assert(profile) {
      if (profile.detailsAssumption === false) {
        return this.assert.elementPresent('.assumptions');
      }
    },
    set: radioQuestion('detailsAssumption').set
  },
  securityDeviceId: radioQuestion('securityDeviceId').set,
  imported: radioQuestion('imported').set,
  importTypeId: radioQuestion('importTypeId').set,
  isVehicleModified: radioQuestion('isVehicleModified'),
  modifications: {
    assert(profile) {
      return this.expect.elements('#modificationsPreviewQuestion .selection-preview__item').count.to.equal(profile.modifications.length);
    },
    set(profile) {
      profile.modifications.forEach(({category, type}, i) => {
        if (i > 0) {
          this
            .waitForElementVisible('@addAnotherModification')
            .click('@addAnotherModification')
            .waitForElementVisible('@modificationCategory');
        }

        this
          .selectOption('select[name="modificationCategory"]', category)
          .waitForElementVisible('@modificationType')
          .selectOption('select[name="modificationType"]', type);
      });

      return this;
    }
  },
  vehicleValue: inputQuestion('vehicleValue').set,
  carBought: radioQuestion('carBought'),
  monthCarBought: selectQuestion('monthCarBought'),
  yearCarBought: selectQuestion('yearCarBought'),
  dateCarBoughtConfirm() {
    return this
      .click('@dateCarBoughtConfirm');
  },
  registeredOwnerAndKeeper: radioQuestion('registeredOwnerAndKeeper'),
  registeredOwner: selectQuestion('registeredOwner'),
  registeredKeeper: selectQuestion('registeredKeeper'),
  anyOtherCars: radioQuestion('anyOtherCars'),
  anyOtherCarsId: radioQuestion('anyOtherCarsId'),
  usageType: radioQuestion('usageType'),
  businessUsageType: radioQuestion('businessUsageType'),
  businessMilesPerYear: inputQuestion('businessMilesPerYear'),
  personalMilesPerYear: inputQuestion('personalMilesPerYear'),
  personalMilesPerYearEstimated(profile) {
    if (profile.personalMilesPerYearEstimated) {
      return this.click('@personalMilesPerYearEstimatedConfirm');
    }

    return this.click('@personalMilesPerYearEstimatedEdit');
  },
  daytimeStorageLocation: radioQuestion('daytimeStorageLocation'),
  daytimeStorageLocationOther: selectQuestion('daytimeStorageLocationOther'),
  overnightStorageLocation: radioQuestion('overnightStorageLocation'),
  overnightStorageLocationOther: selectQuestion('overnightStorageLocationOther'),
  numberOfSeats: inputQuestion('numberOfSeats').set,
  makeId: radioQuestion('makeId').set,
  modelId: radioQuestion('modelId').set,
  engineTypeId: radioQuestion('engineTypeId').set,
  transmissionId: radioQuestion('transmissionId').set,
  manufacturedYear: selectQuestion('manufacturedYear').set,
  engineLitres: radioQuestion('engineLitres').set,
  variantId: selectQuestion('variantId').set,
  manualVehicle() {
    return this
      .click('label[for=manualVehicle-0]')
      .confirmManualVehicle();
  },
  email(profile) {
    return this.clearAndSetValue(selectors.email, profile.email)
      .click('@blurTarget');
  },
  password: inputQuestion('password').set
};

const actionCommands = {
  isManualVehicle() {
    return this.click('@isManualVehicle');
  },
  confirmManualVehicle() {
    return this
      .waitForElementVisible('@manualVehicleConfirm')
      .click('@manualVehicleConfirm')
      .waitForElementVisible('@selectedVehiclePreview');
  },
  signInInline(profile) {
    return this
      .click('@signInLink')
      .completePageWith({
        email: profile.email,
        password: profile.password
      })
      .click('@signInConfirm')
      .waitForElementVisible('@signInConfirmed');
  },
  forgottenPasswordInLine(profile) {
    return this
      .click('@signInLink')
      .completePageWith({email: profile.email})
      .click('@forgottenPasswordLink')
      .waitForElementVisible('@forgottenPasswordConfirmed');
  }
};

module.exports = {
  commands: [commonCommands, questionCommands, actionCommands],
  url: function () {
    return `${this.api.launch_url}${this.api.globals.context_path}/questionset/your-car`;
  },
  elements: [
    commonElements,
    vehicleElements,
    manualVehicleElements,
    detailAssumptionsElements,
    selectors
  ]
};