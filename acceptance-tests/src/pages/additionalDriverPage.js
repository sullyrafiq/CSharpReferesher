import commonCommands from '../common/commands';
import {checkboxQuestion, inputQuestion, radioQuestion, selectQuestion} from '../common/questionTypeCommands';
import commonElements from '../common/elements';
import claimsElements from '../sections/your-details/claims';
import drivingOffencesElements from '../sections/your-details/drivingOffences';

const selectors = {
  additionalDriverFirstName: '#additionalDriverFirstName',
  firstNameValidationMessage: '#additionalDriverFirstNameQuestion .warning__message',
  additionalDriverLastName: '#additionalDriverLastName',
  lastNameValidationMessage: '#additionalDriverLastNameQuestion .warning__message',
  dateOfBirth: '#additionalDriverDateOfBirthQuestion',
  dateOfBirthDay: 'input[name=additionalDriverDateOfBirth-DD]',
  dateOfBirthMonth: 'input[name=additionalDriverDateOfBirth-MM]',
  dateOfBirthYear: 'input[name=additionalDriverDateOfBirth-YYYY]',
  dateOfBirthValidationMessage: '#additionalDriverDateOfBirthQuestion .warning__message',
  gender: '#genderQuestion',
  genderValidationMessage: '#genderQuestion .warning__message',
  additionalDriverRelationshipId: '#additionalDriverRelationshipIdQuestion',
  relationshipIdValidationMessage: '#additionalDriverRelationshipIdQuestion .warning__message',
  maritalStatusId: '#maritalStatusIdQuestion',
  maritalStatusIdValidationMessage: '#maritalStatusIdQuestion .warning__message',
  isUkResidentFromBirth: '#isUkResidentFromBirthQuestion',
  isUkResidentFromBirthValidationMessage: '#isUkResidentFromBirthQuestion .warning__message',
  ukResidencyStartMonth: 'select[name="ukResidencyStartMonth"]',
  ukResidencyStartYear: 'select[name="ukResidencyStartYear"]',
  employmentStatus: '#employmentStatusQuestion',
  employmentStatusEmployed: 'label[for=employmentStatus-0]',
  employmentStatusValidationMessage: '#employmentStatusQuestion .warning__message',
  employmentStatusStudent: 'label[for=employmentStatus-3]',
  studentType: 'select[name=studentType]',
  occupation: '#additionalDriverOccupationQuestion input',
  occupationValidationMessage: '#additionalDriverOccupationQuestion .warning__message',
  businessSector: '#businessSectorQuestion input',
  businessSectorValidationMessage: '#businessSectorQuestion .warning__message',
  additionalDriverUnemployedType: '#additionalDriverUnemployedTypeQuestion',
  additionalDriverUnemployedTypeOther: 'select[name=additionalDriverUnemployedTypeOther]',
  hasAdditionalOccupation: '#hasAdditionalOccupationQuestion',
  additionalOccupation: '#additionalOccupationQuestion input',
  additionalOccupationValidationMessage: '#additionalOccupationQuestion .warning__message',
  additionalOccupationBusinessSector: '#additionalDriverAdditionalOccupationBusinessSectorQuestion input',
  // eslint-disable-next-line id-length
  additionalOccupationBusinessSectorValidationMessage: '#additionalDriverAdditionalOccupationBusinessSectorQuestion .warning__message',
  licenceType: '#licenceTypeQuestion',
  licenceMedicalRestrictionDuration: '#licenceMedicalRestrictionDurationQuestion',
  licenceTypeValidationMessage: '#licenceTypeQuestion .warning__message',
  licenceIssueCountry: '#licenceIssueCountryQuestion',
  licenceCover: '#licenceCoverQuestion',
  licenceWithAdditionalQualification: '#licenceWithAdditionalQualificationQuestion',
  licenceAdditionalQualification: '#licenceAdditionalQualificationQuestion',
  additionalDriverMedicalRestrictionDuration: '#additionalDriverMedicalRestrictionDurationQuestion',
  hasMedicalCondition: '#hasMedicalConditionQuestion',
  hasMedicalConditionValidationMessage: '#hasMedicalConditionQuestion .warning__message',
  additionalDriverMedicalConditionId: 'select[name=additionalDriverMedicalConditionId]',
  additionalDriverHasLicenceNumber: '#additionalDriverHasLicenceNumberQuestion',
  hasLicenceNumberValidationMessage: '#additionalDriverHasLicenceNumberQuestion .warning__message',
  licenceNumber: '#licenceNumberQuestion',
  licenceNumberSegment0: 'input[name=licenceNumberSegment0]',
  licenceNumberSegment1: 'input[name=licenceNumberSegment1]',
  licenceNumberSegment2: 'input[name=licenceNumberSegment2]',
  licenceNumberSegment3: 'input[name=licenceNumberSegment3]',
  additionalDriverNumberOfYearsLicenceHeld: 'select[name=additionalDriverNumberOfYearsLicenceHeld]',
  additionalDriverNumberOfMonthsLicenceHeld: 'select[name=additionalDriverNumberOfMonthsLicenceHeld]',
  numberOfYearsLicenceHeldValidationMessage: '#additionalDriverNumberOfYearsLicenceHeldQuestion .warning__message',
  additionalDriverHasClaims: '#additionalDriverHasClaimsQuestion',
  hasClaimsValidationMessage: '#additionalDriverHasClaimsQuestion .warning__message',
  claims: '.claims-question',
  hasDrivingOffences: '#hasDrivingOffencesQuestion',
  hasDrivingOffencesValidationMessage: '#hasDrivingOffencesQuestion .warning__message',
  drivingOffences: '.driving-offences-question',
  hasNonMotoringConvictions: '#hasNonMotoringConvictionsQuestion',
  hasNonMotoringConvictionsValidationMessage: '#hasNonMotoringConvictionsQuestion .warning__message',
  anyOtherCars: '#anyOtherCarsQuestion',
  anyOtherCarsValidationMessage: '#anyOtherCarsQuestion .warning__message',
  anyOtherCarsId: '#anyOtherCarsIdQuestion'
};

const questionCommands = {
  additionalDriverFirstName: inputQuestion('additionalDriverFirstName'),
  additionalDriverLastName: inputQuestion('additionalDriverLastName'),
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
  additionalDriverRelationshipId: radioQuestion('additionalDriverRelationshipId'),
  maritalStatusId: radioQuestion('maritalStatusId'),
  isUkResidentFromBirth: checkboxQuestion('isUkResidentFromBirth'),
  ukResidencyStartMonth: selectQuestion('ukResidencyStartMonth'),
  ukResidencyStartYear: selectQuestion('ukResidencyStartYear'),
  employmentStatus: radioQuestion('employmentStatus'),
  occupation: {
    assert(profile) {
      this.assert.value(selectors.occupation, profile.occupation);
    },
    set(profile) {
      this.clearAndSetValue(selectors.occupation, profile.occupation);

      if (profile.occupation) {
        return this
          .waitForElementVisible('#additionalDriverOccupationQuestion li:first-child')
          .click('#additionalDriverOccupationQuestion li:first-child');
      }

      return this;
    }
  },
  businessSector: {
    assert(profile) {
      this.assert.value(selectors.businessSector, profile.businessSector);
    },
    set(profile) {
      this.clearAndSetValue(selectors.businessSector, profile.businessSector);

      if (profile.businessSector) {
        return this
          .waitForElementVisible('#businessSectorQuestion li:first-child')
          .click('#businessSectorQuestion li:first-child');
      }
      return this;
    }
  },
  studentType: selectQuestion('studentType'),
  additionalDriverUnemployedType: radioQuestion('additionalDriverUnemployedType'),
  additionalDriverUnemployedTypeOther: selectQuestion('additionalDriverUnemployedTypeOther'),
  hasAdditionalOccupation: radioQuestion('hasAdditionalOccupation'),
  additionalOccupation(profile) {
    this.clearAndSetValue(selectors.additionalOccupation, profile.additionalOccupation);

    if (profile.additionalOccupation) {
      this.api.pause(50);

      return this
        .waitForElementVisible('#additionalOccupationQuestion li:first-child')
        .click('#additionalOccupationQuestion li:first-child');
    }

    return this;

  },
  additionalOccupationBusinessSector(profile) {
    this.clearAndSetValue(selectors.additionalOccupationBusinessSector, profile.additionalOccupationBusinessSector);

    if (profile.additionalOccupationBusinessSector) {
      this.api.pause(50);

      return this
        .waitForElementVisible('#additionalDriverAdditionalOccupationBusinessSectorQuestion li:first-child')
        .click('#additionalDriverAdditionalOccupationBusinessSectorQuestion li:first-child');
    }

    return this;
  },
  licenceType: radioQuestion('licenceType'),
  licenceMedicalRestrictionDuration: radioQuestion('licenceMedicalRestrictionDuration'),
  licenceIssueCountry: radioQuestion('licenceIssueCountry'),
  licenceCover: radioQuestion('licenceCover'),
  licenceWithAdditionalQualification: radioQuestion('licenceWithAdditionalQualification'),
  licenceAdditionalQualification: radioQuestion('licenceAdditionalQualification'),
  additionalDriverHasLicenceNumber: {
    assert(profile) {
      const hasLicenceNumber = profile.additionalDriverHasLicenceNumber && Boolean(profile.licenceNumber);
      return this.assert.attributeEquals(`input[name=additionalDriverHasLicenceNumber][value='${hasLicenceNumber}']`, 'checked', 'true');
    },
    set: radioQuestion('additionalDriverHasLicenceNumber').set
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
  hasMedicalCondition: radioQuestion('hasMedicalCondition'),
  additionalDriverMedicalConditionId: selectQuestion('additionalDriverMedicalConditionId'),
  additionalDriverNumberOfYearsLicenceHeld: selectQuestion('additionalDriverNumberOfYearsLicenceHeld'),
  additionalDriverNumberOfMonthsLicenceHeld: selectQuestion('additionalDriverNumberOfMonthsLicenceHeld'),
  additionalDriverHasClaims: radioQuestion('additionalDriverHasClaims'),
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
  drivingOffencePointsOther: selectQuestion('drivingOffencePointsOther').set,
  drivingOffencePaidFine: radioQuestion('drivingOffencePaidFine').set,
  drivingOffenceFineAmount: inputQuestion('drivingOffenceFineAmount').set,
  drivingOffenceBanned: radioQuestion('drivingOffenceBanned').set,
  drivingOffenceMonthsBanned: inputQuestion('drivingOffenceMonthsBanned').set,
  hasNonMotoringConvictions: radioQuestion('hasNonMotoringConvictions'),
  anyOtherCars: radioQuestion('anyOtherCars'),
  anyOtherCarsId: radioQuestion('anyOtherCarsId')
};

module.exports = {
  url: function () {
    return `${this.api.launch_url}${this.api.globals.context_path}/questionset/additional-drivers`;
  },
  commands: [commonCommands, questionCommands],
  elements: [
    commonElements,
    claimsElements,
    drivingOffencesElements,
    selectors
  ]
};