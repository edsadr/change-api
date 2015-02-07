var changeApi = require('./index.js');

var petitionUrl = 'https://www.change.org/p/medellinjs-host-more-workshops-for-all-talks',
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

client.petitions.getSignatures({
    id: '2350636',
    page: 3,
    page_size: 5
  },
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

client.petitions.getAuthKey({
    'petition_id': 2780461,
    'source_description': 'MedellinJS site',
    'source': 'http://medellinjs.org/comparte',
    'requester_email': 'edsadr@gmail.com',
    'callback_endpoint': 'http://medellinjs.org/get_auth_keys',
    'endpoint': '/v1/petitions/2780461/auth_keys',
    'timestamp': new Date().getTime()
  },
  function (err, res, body) {
    console.log(body);
  });

client.petitions.addSignature({
    'petition_id': 2780461,
    'auth_key': '',
    'source': 'http://medellinjs.org/comparte',
    'email': 'edsadr@gmail.com',
    'first_name': 'Adrian',
    'last_name': 'Estrada',
    'city': 'Medellin',
    'postal_code': '000000',
    'country_code': 'CO',
    'endpoint': '/v1/petitions/2780461/auth_keys',
    'timestamp': new Date().getTime()
  },
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