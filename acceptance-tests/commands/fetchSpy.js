exports.command = function () {
  return this
    .execute(() => {
      window.realFetch = window.fetch;
      window.fetchCalls = [];
      window.fetch = function (uri, options) {
        return window.realFetch(uri, options).then((response) => {
          window.fetchCalls.push({ uri, request: options, response });
          return response;
        });
      };
    });
};