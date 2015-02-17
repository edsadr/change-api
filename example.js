var changeApi = require('change-api');

var petitionUrl = 'https://www.change.org/p/medellinjs-host-more-workshops-for-all-talks',
  organizationID = '5848',
  apiKey = process.env.CHANGE_API_KEY,
  apiSecret = process.env.CHANGE_API_SECRET;

var client = changeApi.createClient({
  api_key: apiKey
});

client.petitions.getByUrl(petitionUrl,
  function (err, res, body) {
    console.log(body);
  });

client.organizations.getPetitions({
    id: organizationID,
    page: 2,
    page_size: 5
  },
  function (err, res, body) {
    console.log(body);
  });


client.petitions.getAuthKey({
    'api_secret': apiSecret,
    'petition_id': 2780461,
    'source_description': 'MedellinJS site',
    'source': 'http://medellinjs.org/comparte',
    'requester_email': 'edsadr@gmail.com'
  },
  function (err, res, body) {
    console.log(body);
  });