exports.command = function (selector, value) {
  this
    .perform(() => {
      this.click(`${selector} option[value="${value}"]`);
    });

  return this;
};