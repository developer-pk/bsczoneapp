/* eslint-disable camelcase */
const axios = require('axios');

exports.facebook = async (access_token) => {
  const fields = 'id, firstname, lastname, email, picture';
  const url = 'https://graph.facebook.com/me';
  const params = { access_token, fields };
  const response = await axios.get(url, { params });
  const {
    id, firstname, lastname, email, picture,
  } = response.data;
  return {
    service: 'facebook',
    picture: picture.data.url,
    id,
    firstname,
    lastname,
    email,
  };
};

exports.google = async (access_token) => {
  const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
  const params = { access_token };
  const response = await axios.get(url, { params });
  const {
    sub, firstname, lastname, email, picture,
  } = response.data;
  return {
    service: 'google',
    picture,
    id: sub,
    firstname,
    lastname,
    email,
  };
};
