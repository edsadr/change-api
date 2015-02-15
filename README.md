# change-api [![build status](https://secure.travis-ci.org/edsadr/change-api.png)](http://travis-ci.org/edsadr/change-api)

A Change.org API client for NodeJS/io.js

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
var changeApi = require('./index.js');

var petitionUrl = 'https://www.change.org/p/medellinjs-host-more-workshops-for-all-talks', 
  userID = '17118355'
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
```
## API and endpoints

You can check the official Change.org API in the following url: [https://github.com/change/api_docs/blob/master/v1/documentation](https://github.com/change/api_docs/blob/master/v1/documentation)

### Petitions



### Users

### Organizations


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