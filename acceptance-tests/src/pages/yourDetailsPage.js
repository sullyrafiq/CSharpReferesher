import commonCommands from '../common/commands';
import {
  autoCompleteQuestion,
  checkboxQuestion,
  radioQuestion,
  selectQuestion,
  inputQuestion
} from '../common/questionTypeCommands';
import commonElements from '../common/elements';
import claimsElements from '../sections/your-details/claims';
import drivingOffencesElements from '../sections/your-details/drivingOffences';

const selectors = {
  firstName: '#firstName',
  firstNameValidationMessage: '#firstNameQuestion .warning__message',
  lastName: '#lastName',
  lastNameValidationMessage: '#lastNameQuestion .warning__message',
  dateOfBirth: '#dateOfBirthQuestion',
  dateOfBirthDay: 'input[name=dateOfBirth-DD]',
  dateOfBirthMonth: 'input[name=dateOfBirth-MM]',
  dateOfBirthYear: 'input[name=dateOfBirth-YYYY]',
  dateOfBirthValidationMessage: '#dateOfBirthQuestion .warning__message',
  gender: '#genderQuestion',
  genderValidationMessage: '#genderQuestion .warning__message',
  postcode: 'input[name=postcode]',
  address: '.address-lookup',
  findAddress: '.address-lookup .btn--subprimary',
  addressList: '.address-lookup .scrollable-selector',
  changeAddress: '.address-lookup .btn--link',
  addressPreview: '.address-lookup .selection-preview',
  addressPreviewTitle: '.address-lookup .selection-preview__title',
  postcodeValidationMessage: '#addressPostcodeQuestion .warning__message',
  addressValidationMessage: '#addressSelectQuestion .warning__message',
  isHomeOwner: '#isHomeOwnerQuestion',
  isHomeOwnerValidationMessage: '#isHomeOwnerQuestion .warning__message',
  isUkResidentFromBirth: '#isUkResidentFromBirthQuestion',
  isUkResidentFromBirthValidationMessage: '#isUkResidentFromBirthQuestion .warning__message',
  ukResidencyStartMonth: 'select[name="ukResidencyStartMonth"]',
  ukResidencyStartYear: 'select[name="ukResidencyStartYear"]',
  maritalStatusId: '#maritalStatusIdQuestion',
  maritalStatusIdValidationMessage: '#maritalStatusIdQuestion .warning__message',
  numberOfChildrenUnder16: '#numberOfChildrenUnder16Question',
  numberOfChildrenUnder16Other: 'input[name=numberOfChildrenUnder16Other]',
  numberOfChildrenUnder16QuestionValidationMessage: '#numberOfChildrenUnder16Question .warning__message',
  employmentStatus: '#employmentStatusQuestion',
  studentType: 'select[name=studentType]',
  employmentStatusValidationMessage: '#employmentStatusQuestion .warning__message',
  occupation: '#occupationQuestion input',
  occupationValidationMessage: '#occupationQuestion .warning__message',
  businessSector: '#businessSectorQuestion input',
  businessSectorValidationMessage: '#businessSectorQuestion .warning__message',
  unemployedType: '#unemployedTypeQuestion',
  unemployedTypeOther: 'select[name=unemployedTypeOther]',
  hasAdditionalOccupation: '#hasAdditionalOccupationQuestion',
  additionalOccupation: '#additionalOccupationQuestion input',
  additionalOccupationValidationMessage: '#additionalOccupationQuestion .warning__message',
  additionalOccupationBusinessSector: '#additionalOccupationBusinessSectorQuestion input',
  // eslint-disable-next-line id-length
  additionalOccupationBusinessSectorValidationMessage: '#additionalOccupationBusinessSectorQuestion .warning__message',
  numberOfCarsInHousehold: '#numberOfCarsInHouseholdQuestion',
  numberOfCarsInHouseholdValidationMessage: '#numberOfCarsInHouseholdQuestion .warning__message',
  licenceType: '#licenceTypeQuestion',
  licenceTypeValidationMessage: '#licenceTypeQuestion .warning__message',
  licenceIssueCountry: '#licenceIssueCountryQuestion',
  licenceCover: '#licenceCoverQuestion',
  licenceWithAdditionalQualification: '#licenceWithAdditionalQualificationQuestion',
  licenceAdditionalQualification: '#licenceAdditionalQualificationQuestion',
  licenceMedicalRestrictionDuration: '#licenceMedicalRestrictionDurationQuestion',
  medicalRestrictionDurationLessThan3Years: 'label[for=licenceMedicalRestrictionDuration-0]',
  hasMedicalCondition: '#hasMedicalConditionQuestion',
  hasMedicalConditionValidationMessage: '#hasMedicalConditionQuestion .warning__message',
  medicalConditionId: 'select[name=medicalConditionId]',
  hasLicenceNumber: '#hasLicenceNumberQuestion',
  hasLicenceNumberValidationMessage: '#hasLicenceNumberQuestion .warning__message',
  licenceNumber: '#licenceNumberQuestion',
  licenceNumberSegment0: 'input[name=licenceNumberSegment0]',
  licenceNumberSegment1: 'input[name=licenceNumberSegment1]',
  licenceNumberSegment2: 'input[name=licenceNumberSegment2]',
  licenceNumberSegment3: 'input[name=licenceNumberSegment3]',
  numberOfYearsLicenceHeld: 'select[name=numberOfYearsLicenceHeld]',
  numberOfMonthsLicenceHeld: 'select[name=numberOfMonthsLicenceHeld]',
  numberOfYearsLicenceHeldValidationMessage: '#numberOfYearsLicenceHeldQuestion .warning__message',
  hasClaims: '#hasClaimsQuestion',
  hasClaimsValidationMessage: '#hasClaimsQuestion .warning__message',
  claims: '.claims-question',
  hasDrivingOffences: '#hasDrivingOffencesQuestion',
  hasDrivingOffencesValidationMessage: '#hasDrivingOffencesQuestion .warning__message',
  drivingOffences: '.driving-offences-question',
  hasNonMotoringConvictions: '#hasNonMotoringConvictionsQuestion',
  hasNonMotoringConvictionsValidationMessage: '#hasNonMotoringConvictionsQuestion .warning__message'
};

const questionCommands = {
  firstName: inputQuestion('firstName'),
  lastName: inputQuestion('lastName'),
  dateOfBirth: {
    assert(profile) {
      this.assert.value(selectors.dateOfBirthDay, profile.dateOfBirth.day);
      this.assert.value(selectors.dateOfBirthMonth, profile.dateOfBirth.month);
      this.assert.value(selectors.dateOfBirthYear, profile.dateOfBirth.year);

      return this;
    },
    set(profile) {
      return this
        .clearAndSetValue(selectors.dateOfBirthDay, profile.dateOfBirth.day)
        .clearAndSetValue(selectors.dateOfBirthMonth, profile.dateOfBirth.month)
        .clearAndSetValue(selectors.dateOfBirthYear, [profile.dateOfBirth.year, '\uE004']);
    }
  },
  gender: radioQuestion('gender'),
  postcode: inputQuestion('postcode').set,
  address: {
    assert() {
      this.assert.elementPresent('@addressPreview');
    },
    set() {
      return this
        .findAddress()
        .click('#addressSelectQuestion li:first-child');
    }
  },
  isHomeOwner: radioQuestion('isHomeOwner'),
  isUkResidentFromBirth: checkboxQuestion('isUkResidentFromBirth'),
  ukResidencyStartMonth: selectQuestion('ukResidencyStartMonth'),
  ukResidencyStartYear: selectQuestion('ukResidencyStartYear'),
  maritalStatusId: radioQuestion('maritalStatusId'),
  numberOfChildrenUnder16: radioQuestion('numberOfChildrenUnder16'),
  numberOfChildrenUnder16Other: inputQuestion('numberOfChildrenUnder16Other'),
  employmentStatus: radioQuestion('employmentStatus'),
  occupation: autoCompleteQuestion('occupation'),
  businessSector: autoCompleteQuestion('businessSector'),
  studentType: selectQuestion('studentType'),
  unemployedType: radioQuestion('unemployedType'),
  unemployedTypeOther: selectQuestion('unemployedTypeOther'),
  hasAdditionalOccupation: radioQuestion('hasAdditionalOccupation'),
  additionalOccupation: autoCompleteQuestion('additionalOccupation'),
  additionalOccupationBusinessSector: autoCompleteQuestion('additionalOccupationBusinessSector'),
  numberOfCarsInHousehold: radioQuestion('numberOfCarsInHousehold'),
  licenceType: radioQuestion('licenceType'),
  licenceIssueCountry: radioQuestion('licenceIssueCountry'),
  licenceCover: radioQuestion('licenceCover'),
  licenceWithAdditionalQualification: radioQuestion('licenceWithAdditionalQualification'),
  licenceAdditionalQualification: radioQuestion('licenceAdditionalQualification'),
  licenceMedicalRestrictionDuration: radioQuestion('licenceMedicalRestrictionDuration'),
  hasMedicalCondition: radioQuestion('hasMedicalCondition'),
  medicalConditionId: selectQuestion('medicalConditionId'),
  hasLicenceNumber: {
    assert(profile) {
      const hasLicenceNumber = profile.hasLicenceNumber && Boolean(profile.licenceNumber);
      return this.assert.attributeEquals(`input[name=hasLicenceNumber][value='${hasLicenceNumber}']`, 'checked', 'true');
    },

    set: radioQuestion('hasLicenceNumber').set
  },
  licenceNumber: {
    assert(profile) {
      this.assert.value(selectors.licenceNumberSegment1, profile.licenceNumber[1]);
      this.assert.value(selectors.licenceNumberSegment2, profile.licenceNumber[2]);
      this.assert.value(selectors.licenceNumberSegment3, profile.licenceNumber[3]);

      return this;
    },
    set(profile) {
      return this
        .getValue(selectors.licenceNumberSegment0, ((result) => {
          this.assert.equal(result.value, profile.licenceNumber[0]);
        }))
        .clearAndSetValue(selectors.licenceNumberSegment0, profile.licenceNumber[0])
        .getValue(selectors.licenceNumberSegment1, ((result) => {
          this.assert.equal(result.value, profile.licenceNumber[1]);
        }))
        .clearAndSetValue(selectors.licenceNumberSegment1, profile.licenceNumber[1])
        .clearAndSetValue(selectors.licenceNumberSegment2, profile.licenceNumber[2])
        .clearAndSetValue(selectors.licenceNumberSegment3, profile.licenceNumber[3]);
    }
  },
  numberOfYearsLicenceHeld: selectQuestion('numberOfYearsLicenceHeld'),
  numberOfMonthsLicenceHeld: selectQuestion('numberOfMonthsLicenceHeld'),
  hasClaims: radioQuestion('hasClaims'),
  claims: {
    assert(profile) {
      return this.expect.elements('.claims-question .selection-preview').count.to.equal(profile.claims.length);
    },
    set(profile) {
      profile.claims.forEach((claim, i) => {
        if (i > 0) {
          this
            .waitForElementVisible('@addAnotherClaim')
            .click('@addAnotherClaim')
            .waitForElementVisible('@claimType')
            .api.pause(500);
        }

        this
          .completePageWith(claim)
          .click('@saveClaim');
      });

      return this;
    }
  },
  claimType: radioQuestion('claimType').set,
  claimTypeOther: selectQuestion('claimTypeOther').set,
  claimFault: radioQuestion('claimFault').set,
  claimStolen: radioQuestion('claimStolen').set,
  claimDate(claim) {
    return this
      .clearAndSetValue(claimsElements.claimDateDay, claim.claimDate.day)
      .clearAndSetValue(claimsElements.claimDateMonth, claim.claimDate.month)
      .clearAndSetValue(claimsElements.claimDateYear, [claim.claimDate.year, '\uE004']);
  },
  claimNoClaimsAffected: radioQuestion('claimNoClaimsAffected').set,
  hasDrivingOffences: radioQuestion('hasDrivingOffences'),
  drivingOffences: {
    assert(profile) {
      return this.expect.elements('.driving-offences-question .selection-preview').count.to.equal(profile.drivingOffences.length);
    },
    set(profile) {
      profile.drivingOffences.forEach((drivingOffence, i) => {
        if (i > 0) {
          this
            .waitForElementVisible('@addAnotherDrivingOffence')
            .click('@addAnotherDrivingOffence')
            .waitForElementVisible('@drivingOffenceType')
            .api.pause(500);
        }

        this
          .completePageWith(drivingOffence)
          .click('@saveDrivingOffence');
      });

      return this;
    }
  },
  drivingOffenceType: radioQuestion('drivingOffenceType').set,
  drivingOffenceCode: radioQuestion('drivingOffenceCode').set,
  drivingOffenceCodeOther(drivingOffence) {
    this.clearAndSetValue(drivingOffencesElements.drivingOffenceCodeOther, drivingOffence.drivingOffenceCodeOther);

    if (drivingOffence.drivingOffenceCodeOther) {
      this.api.pause(50);

      return this
        .waitForElementVisible('#drivingOffenceCodeQuestion .autocomplete li:first-child')
        .click('#drivingOffenceCodeQuestion .autocomplete li:first-child');
    }

    return this;
  },
  drivingOffenceTypeCodeOther(drivingOffence) {
    this.clearAndSetValue(drivingOffencesElements.drivingOffenceTypeCodeOther, drivingOffence.drivingOffenceTypeCodeOther);

    if (drivingOffence.drivingOffenceTypeCodeOther) {
      this.api.pause(50);

      return this
        .waitForElementVisible('#drivingOffenceCodeOtherQuestion .autocomplete li:first-child')
        .click('#drivingOffenceCodeOtherQuestion .autocomplete li:first-child');
    }

    return this;
  },
  drivingOffenceAlcoholReading: inputQuestion('drivingOffenceAlcoholReading').set,
  drivingOffenceDate(drivingOffence) {
    return this
      .clearAndSetValue(drivingOffencesElements.drivingOffenceDateDay, drivingOffence.drivingOffenceDate.day)
      .clearAndSetValue(drivingOffencesElements.drivingOffenceDateMonth, drivingOffence.drivingOffenceDate.month)
      .clearAndSetValue(drivingOffencesElements.drivingOffenceDateYear, [drivingOffence.drivingOffenceDate.year, '\uE004']);
  },
  drivingOffencePenaltyPoints: radioQuestion('drivingOffencePenaltyPoints').set,
  drivingOffencePointsOther: selectQuestion('drivingOffencePointsOther'),
  drivingOffencePaidFine: radioQuestion('drivingOffencePaidFine').set,
  drivingOffenceFineAmount: inputQuestion('drivingOffenceFineAmount').set,
  drivingOffenceBanned: radioQuestion('drivingOffenceBanned').set,
  drivingOffenceMonthsBanned: inputQuestion('drivingOffenceMonthsBanned').set,
  hasNonMotoringConvictions: radioQuestion('hasNonMotoringConvictions')
};

const actionCommands = {
  findAddress() {
    return this
      .click('@findAddress')
      .waitForElementVisible('@addressList');
  },
  removeClaims(profile) {
    profile.removeClaims.forEach((i) => {
      this.click(`.claims-question .multi-question__selection:nth-child(${i + 1}) .selection-preview__remove-item`);
    });

    return this;
  },
  claimsRemoval(profile) {
    return this.click(`@claimsRemoval${profile.claimsRemoval ? 'Confirm' : 'Cancel'}`);
  },
  removeDrivingOffences(profile) {
    profile.removeDrivingOffences.forEach((i) => {
      this.click(`.driving-offences-question .multi-question__selection:nth-child(${i + 1}) .selection-preview__remove-item`);
    });

    return this;
  },
  drivingOffencesRemoval(profile) {
    return this.click(`@drivingOffencesRemoval${profile.drivingOffencesRemoval ? 'Confirm' : 'Cancel'}`);
  }
};

module.exports = {
  commands: [commonCommands, questionCommands, actionCommands],
  url: function () {
    return `${this.api.launch_url}${this.api.globals.context_path}/questionset/your-details`;
  },
  elements: [
    commonElements,
    claimsElements,
    drivingOffencesElements,
    selectors
  ]
};