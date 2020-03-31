exports.command = function (selector, value) {
  return this
    .click(selector)
    .perform((done) => {
      this.execute((data) => {
        window.document.querySelector(data).value = '';
      }, [selector], done);
    })
    .perform((done) =>  {
      if (value === '') {
        this.setValue(selector, [' ', '\uE003']);
      }

      done();
    })
    .setValue(selector, value);
};
