# App Store Validator
 [![NPM](https://nodei.co/npm/app-store-validator.png)](https://nodei.co/npm/app-store-validator/)

Are you building a solution for app developers? Does your form require an app store reference?
Use App Store Validator to find an app on both (iTunes/Play) app stores, or search for an app by name.

## Usage
### Installation
```bash
$ npm i app-store-validator --save
```

### Sample code
```javascript
var appStoreValidator = require('app-store-validator');

var iTunesFacebook = '284882215';
appStoreValidator.iTunes.get(iTunesFacebook, function(error, result) {
    if(error) {
        console.error(error);
    }
    else {
        console.dir(result);
    }
});
```

### Supported functions
- ***storeName.get***(*appStoreId*, callback) - get details about a specific app
- ***storeName*.search**(*appName*, callback) - returns array of found apps

Where:
- *storeName* is 'Play' or 'iTunes'
- *appStoreId* is either an iTunes ID (9 digits), or a Java package ID (com.name1.name2)
- *appName* is a string

### Sample result
```javascript
{
  name: 'Facebook',
  version: '29.0',
  company: 'Facebook, Inc.',
  category: 'Social Networking',
  description: 'Keeping up with friends is faster than ever...',
  avgUserRating: 3.5,
  ratingsCount: 2878923
}
```

PS: results accurate at time of writing this doc.

## Building
1. The module is written in ES6, complied by [Babel](https://babeljs.io/) into ES5.
2. It uses [Mocha](http://mochajs.org/) for unit tests.
3. It uses [ESLint](http://eslint.org/) to lint the code.
4. It uses [Gulp](http://gulpjs.com/) to build the module.
5. And since Google Play Store does not have a (documented) API, it uses [Cheerio](https://github.com/cheeriojs/cheerio) to scrape the store.

To build the code:
```bash
$ git clone https://github.com/TravelingTechGuy/app-store-validator.git
$ cd app-store-validator
$ npm i
$ npm run build    #lint and build
$ npm run test     #run unit tests
```

## License

(The MIT License)

Copyright (c) 2015 Guy Vider [Traveling Tech Guy](http://TravelingTechGuy.com)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
