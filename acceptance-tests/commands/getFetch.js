exports.command = function ({ url, method }, assertion) {
  return this
    .execute((urlMatcher = '', methodMatcher = 'GET') => {
      return window.fetchCalls
        .find(call => call.uri.indexOf(urlMatcher) !== -1 && call.request.method === methodMatcher);
    }, [url, method], assertion);
};