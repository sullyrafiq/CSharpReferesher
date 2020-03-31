exports.command = function (selector, callback) {
  // eslint-disable-next-line prefer-arrow-callback
  this.execute(function (clickSelector) {
    document.querySelector(clickSelector).click();
  }, [selector], (result) => {
    if (typeof callback === 'function') {
      callback.call(this, result);
    }
  });

  return this;
};