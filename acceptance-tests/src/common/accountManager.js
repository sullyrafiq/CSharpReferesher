import uuid from 'uuid/v1';
import fetch from 'node-fetch';

const generateAccountCredentials = () => {
  return {
    email: `mcqueen_${uuid()}@moneysupermarket.com`,
    password: uuid(),
    delete: true
  };
};

const generateAccountCredentialsForSmokeTest = () => {
  return {
    email: `monitoringtests_${uuid()}@bh.exacttarget.com`,
    password: uuid(),
    delete: true
  };
};

const createAccount = (client, {email, password}) => {
  const url = `${client.globals.services_url}/gb/account/v3/accounts`;

  const requestBody = {
    account: {
      organisationId: 1,
      primaryEmailAddress: {
        emailAddress: email,
        isVerified: false
      },
      password: {password}
    },
    profiles: [
      {
        organisationId: 1,
        currency: 'GBP',
        accountOwner: {
          id: uuid(),
          firstName: 'Joe',
          surname: 'Bloggs',
          dateOfBirth: '1990-01-01'
        }
      }
    ]
  };

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Organisation-ID': 1,
    'Client-ID': 22,
    'Channel-ID': 201,
    'Activity-Type-ID': 3
  };

  return fetch(url, {body: JSON.stringify(requestBody), headers, method: 'POST'})
    .then(response => response.json())
    .then(response => response.account.id)
    .catch((error) => {
      throw error;
    });
};

const deleteAccount = (client, accountId) => {
  const headers = {
    'Organisation-ID': 1,
    'Client-ID': 22,
    'Account-ID': accountId
  };

  const url = `${client.globals.services_url}/gb/account/v3/accounts/${accountId}`;
  return fetch(url, {method: 'DELETE', headers})
    .catch((error) => {
      throw error;
    });
};

const getAccountId = (client, {email}) => {
  const url = `${client.globals.services_url}/gb/account/v3/account-search/?primaryEmailAddress=${email}&organisationId=1`;
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Organisation-ID': 1,
    'Client-ID': 22,
    'Channel-ID': 201,
    'Activity-Type-ID': 3
  };

  return fetch(url, {method: 'GET', headers})
    .then(response => response.json())
    .then(({account: {id}}) => id)
    .catch((error) => {
      throw error;
    });
};

const postHistory = (client, {enquiryId, accountId}) => {
  const url = `${client.globals.services_url}/gb/enquiry/v0/car-insurance`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic RW5xdWlyeTpzM3J2MWMz',
    'accountId': accountId
  };
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const requestBody = {
    channel_id: 201,
    enquiry_id: enquiryId,
    system_generated: false,
    authorised: true,
    datetime_created: `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} 00:00:00`,
    expiry_datetime: `${today.getDate()}-${today.getMonth() + 2}-${today.getFullYear()} 00:00:00`,
    policy_start_date: `${tomorrow.getDate()}-${tomorrow.getMonth() + 1}-${tomorrow.getFullYear()}`,
    vehicle_registration: 'A1',
    vehicle_make: 'HONDA',
    vehicle_model: 'ACCORD',
    voluntary_excess: 100.00,
    cover_type: 'Comprehensive',
    main_driver_name: 'Marquez',
    number_of_results: 1,
    brand_name: 'Two Call Direct',
    brand_logo: 'TwoCall.gif',
    cheapest_price: '420.00'
  };

  return fetch(url, {method: 'POST', headers, body: JSON.stringify(requestBody)})
    .catch((error) => {
      throw error;
    });
};

export default {
  generateAccountCredentials,
  generateAccountCredentialsForSmokeTest,
  createAccount,
  deleteAccount,
  getAccountId,
  postHistory
};
