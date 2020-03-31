function verifyYourCarPageDetails(yourCarPage) {
  yourCarPage
    .waitForUrlToContain('shop/car-insurance/questionset/your-car')
    .assert.title('Question Set - Your Car');
}

module.exports = {
  'tags': ['journey', 'redirection'],

  'Given I visit /questionset URL': (client) => {
    const questionSetURL = `${client.launch_url}${client.globals.context_path}/questionset/`;
    client.url(questionSetURL);
  },

  'Then I should be redirected to your car page from /questionset page': (client) => {
    verifyYourCarPageDetails(client.page.yourCarPage());
  },

  'Given I visit /your-details URL': (client) => {
    const yourDetailsPageURL = `${client.launch_url}${client.globals.context_path}/questionset/your-details`;
    client.url(yourDetailsPageURL);
  },

  'Then I should be redirected to your car page from /your-details page': (client) => {
    verifyYourCarPageDetails(client.page.yourCarPage());
  },

  'Given I visit /your-policy URL': (client) => {
    const yourPolicyPageURL = `${client.launch_url}${client.globals.context_path}/questionset/your-policy`;
    client.url(yourPolicyPageURL);
  },

  'Then I should be redirected to your car page from /your-policy page': (client) => {
    verifyYourCarPageDetails(client.page.yourCarPage());

    client.end();
  }
};