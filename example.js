var changeApi = require('./index.js');

var petitionUrl = 'https://www.change.org/p/medellinjs-host-more-workshops-for-all-talks',
  usersUrl = 'https://www.change.org/users/edsadr',
  petitionID = '1678685',
  userID = '17118355',
  organizationUrl = 'http://www.change.org/organizations/unicefusa',
  organizationID = '5848',
  apiKey = process.env.CHANGE_API_KEY,
  apiSecret = process.env.CHANGE_API_SECRET;

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

client.petitions.getSignatures({id: petitionID},
  function (err, res, body) {
    console.log(body);
  });

client.petitions.getReasons({id: petitionID},
  function (err, res, body) {
    console.log(body);
  });

client.petitions.getUpdates({id: petitionID},
  function (err, res, body) {
    console.log(body);
  });

client.petitions.getAuthKey({
    'api_secret': apiSecret,
    'petition_id': 2780461,
    'source_description': 'MedellinJS site',
    'source': 'http://medellinjs.org/compartejuan',
    'requester_email': 'edsadr@yahoo.com'    
  },
  function (err, res, body) {
    console.log(body);
  });

client.petitions.addSignature({
    'petition_id': 2780461,
    'api_secret': apiSecret,
    'auth_key': '68608753d33bf5172777341d1d49062bbd1462b0ea3e7445bc18bfff915d8294',
    'source': 'http://medellinjs.org/compartejuan',
    'email': 'edsadr@yahoo.com',
    'first_name': 'Juan',
    'last_name': 'Perez',
    'city': 'Medellin',
    'postal_code': '000000',
    'country_code': 'CO'    
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

client.users.getPetitions({id: userID},
  function (err, res, body) {
    console.log(body);
  });

client.users.getSignatures({id: userID},
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

client.organizations.getPetitions({id: organizationID},
  function (err, res, body) {
    console.log(body);
  });