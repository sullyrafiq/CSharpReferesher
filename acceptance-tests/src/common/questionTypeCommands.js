export const radioQuestion = (field) => {
  return {
    assert(profile) {
      return this.assert.attributeEquals(`input[name=${field}][value='${profile[field]}']`, 'checked', 'true');
    },
    set(profile) {
      return this.triggerClick(`input[name=${field}][value='${profile[field]}'] + label`);
    }
  };
};

export const checkboxQuestion = (field) => {
  return {
    assert(profile) {
      if (Array.isArray(profile[field])) {
        profile[field].forEach((key) => {
          this.assert.attributeEquals(`input[name=${field}][value=${key}]`, 'checked', 'true');
        });
      } else {
        this.api.getAttribute(`input[name=${field}]`, 'checked', (result) => {
          this.assert.strictEqual(String(result.value), String(profile[field] || null));
        });
      }

      return this;
    },
    set(profile) {
      if (Array.isArray(profile[field])) {
        profile[field].forEach((key) => {
          this.triggerClick(`input[name=${field}][value=${key}] + label`);
        });
      } else if (profile[field]) {
        this.triggerClick(`input[name=${field}] + label`);
      }

      return this;
    }
  };
};

export const inputQuestion = (field) => {
  return {
    assert(profile) {
      return this.assert.value(`input[name="${field}"]`, String(profile[field]));
    },
    set(profile) {
      return this.clearAndSetValue(`input[name="${field}"]`, profile[field]);
    }
  };
};

export const selectQuestion = (field) => {
  return {
    assert(profile) {
      this.assert.value(`select[name="${field}"]`, String(profile[field]));
    },
    set(profile) {
      return this.selectOption(`select[name="${field}"]`, profile[field]);
    }
  };
};

export const autoCompleteQuestion = (field) => {
  return {
    assert(profile) {
      return this.assert.value(`#${field}Question input`, profile[field]);
    },
    set(profile) {
      this.clearAndSetValue(`#${field}Question input`, profile[field]);

      if (profile[field]) {
        this.api.pause(50);

        return this
          .waitForElementVisible(`#${field}Question li:first-child`)
          .click(`#${field}Question li:first-child`);
      }

      return this;
    }
  };
};