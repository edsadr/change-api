# change-api [![build status](https://travis-ci.org/edsadr/change-api.svg?branch=master)](http://travis-ci.org/edsadr/change-api)

A Change.org API client for NodeJS/io.js

[![NPM](https://nodei.co/npm/change-api.png)](https://nodei.co/npm/change-api/)

## Installation

```
npm install change-api --save
```

## Usage

```
$ npm install change-api --save
```

A basic example using `change-api` client to save an Applicant

``` js
var changeApi = require('change-api');

var petitionUrl = 'https://www.change.org/p/medellinjs-host-more-workshops-for-all-talks', 
  userID = '17118355'
  //Export your API key as an env variable to use it
  apiKey = process.env.CHANGE_API_KEY;

var changeClient = changeApi.createClient({
  api_key: apiKey
});

//Gets a petition using the public url
changeClient.petitions.getByUrl(petitionUrl,
  function (err, res, body) {
    //Process results here
  });

//Gets a user by ID
changeClient.users.getByID(userID,
  function (err, res, body) {
    //Process results here
  });

//Gets petitions created by organization and uses the pager
client.organizations.getPetitions({
    id: organizationID,
    page: 2,
    page_size: 5
  },
  function (err, res, body) {
    console.log(body);
  });
```
## API and endpoints

You can check the official Change.org API in the following url: [http://www.change.org/developers/docs/resources](http://www.change.org/developers/docs/resources)

### Petitions

Get a petition ID by URL

``` js
client.petitions.getIdByUrl(url, callback);
```

Get a petition by ID

``` js
client.petitions.getByID(id, callback);
```

Get a petition by URL

``` js
client.petitions.getByUrl(url, callback);
```

Get a petition targets by ID

``` js
client.petitions.getTargets(id, callback);
```

Get a petition signatures, it supports pagination so the first parameter is an object and the id property is mandatory, optional you can set the page size and page nummber.

``` js
var options = {
      id: theID
      page: 1,
      page_size: 10
    };

client.petitions.getSignatures(options, callback);
```

Get a petition reasons, it supports pagination so the first parameter is an object and the id property is mandatory, optional you can set the page size and page nummber.

``` js
var options = {
      id: theID
      page: 1,
      page_size: 10
    };

client.petitions.getReasons(options, callback);
```

Get a petition updates, it supports pagination so the first parameter is an object and the id property is mandatory, optional you can set the page size and page nummber.

``` js
var options = {
      id: theID
      page: 1,
      page_size: 10
    };

client.petitions.getUpdates(options, callback);
```

Get an [auth key](http://www.change.org/developers/docs/resources/petitions/auth-keys) to add signatures for a specific petition identified by ID, it requires an specific object with the following: 

``` js
var options = {
    api_secret: apiSecret,
    petition_id: id,
    source_description: sourceDescription,
    source: sourceUrl,
    requester_email: email
  };

client.petitions.getAuthKey(options, callback);
```

Add signatures for a petition, you should request an [auth key](http://www.change.org/developers/docs/resources/petitions/auth-keys) before, more info [here](https://www.change.org/developers/docs/resources/petitions/signatures#post-signatures). It requires an specific object with the following: 

``` js
var options = {
    petition_id: id,
    api_secret: apiSecret,
    auth_key: authKey,
    source: sourceUrl,
    email: email,
    first_name: firstName,
    last_name: lastName,
    city: city,
    postal_code: zipCode,
    country_code: countryCode    
  };

client.petitions.addSignature(options, callback);
```

### Users

Get a user ID by URL

``` js
client.users.getIdByUrl(url, callback);
```

Get a user by ID

``` js
client.users.getByID(id, callback);
```

Get petitions created by a user identified by id, it supports pagination so the first parameter is an object and the id property is mandatory, optional you can set the page size and page nummber.

``` js
var options = {
      id: theID
      page: 1,
      page_size: 10
    };

client.users.getPetitions(options, callback);
```

Get all signed petitions by a user identified by id, it supports pagination so the first parameter is an object and the id property is mandatory, optional you can set the page size and page nummber.

``` js
var options = {
      id: theID
      page: 1,
      page_size: 10
    };

client.users.getSignatures(options, callback);
```

### Organizations

Get an organization ID by URL

``` js
client.organizations.getIdByUrl(url, callback);
```

Get an organization by ID

``` js
client.organizations.getByID(id, callback);
```

Get petitions created by an organization identified by id, it supports pagination so the first parameter is an object and the id property is mandatory, optional you can set the page size and page nummber.

``` js
var options = {
      id: theID
      page: 1,
      page_size: 10
    };

client.organizations.getPetitions(options, callback);
```

## Credits
[Adrián Estrada](https://github.com/edsadr/)

###The MIT License

Copyright (c) 2015 Adrián Estrada

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.