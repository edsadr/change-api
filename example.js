var changeApi = require('./index.js');

var petitionUrl = 'https://www.change.org/p/simon-rodwell-teach-the-javascript-masterclass',
  usersUrl = 'https://www.change.org/users/edsadr',
  petitionID = '1678685',
  userID = '17118355',
  organizationUrl = 'http://www.change.org/organizations/unicefusa',
  organizationID = '5848',
  apiKey = process.env.CHANGE_API_KEY;

var client = changeApi.createClient({
  api_key: apiKey
});

client.petitions.getIdByUrl(petitionUrl,
  function (err, res, body) {
    console.log(body);
  });

client.petitions.getByID(petitionID,
  function (err, res, body) {
    console.log(body);
  });

client.petitions.getByUrl(petitionUrl,
  function (err, res, body) {
    console.log(body);
  });

client.petitions.getTargets(petitionID,
  function (err, res, body) {
    console.log(body);
  });

client.petitions.getSignatures({id: '2350636', page: 3, page_size:5},
  function (err, res, body) {
    console.log(body);
  });

client.petitions.getReasons(petitionID,
  function (err, res, body) {
    console.log(body);
  });

client.petitions.getUpdates(petitionID,
  function (err, res, body) {
    console.log(body);
  });

client.users.getIdByUrl(usersUrl,
  function (err, res, body) {
    console.log(body);
  });

client.users.getByID(userID,
  function (err, res, body) {
    console.log(body);
  });

client.users.getPetitions(userID,
  function (err, res, body) {
    console.log(body);
  });

client.users.getSignatures(userID,
  function (err, res, body) {
    console.log(body);
  });

client.organizations.getIdByUrl(organizationUrl,
  function (err, res, body) {
    console.log(body);
  });

client.organizations.getByID(organizationID,
  function (err, res, body) {
    console.log(body);
  });

client.organizations.getPetitions(organizationID,
  function (err, res, body) {
    console.log(body);
  });