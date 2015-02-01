var changeApi = require('./index.js');

var petitionUrl = 'https://www.change.org/p/simon-rodwell-teach-the-javascript-masterclass',
  usersUrl = 'https://www.change.org/users/edsadr',
  petitionID = '1678685',
  userID = '17118355',
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

client.users.getIdByUrl(usersUrl,
  function (err, res, body) {
    console.log(body);
  });

client.users.getByID(userID,
  function (err, res, body) {
    console.log(body);
  });