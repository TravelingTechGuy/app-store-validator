#App Store Validator examples
This folder contains 2 sample files showing how to use the library, in regular JS (ES5) and ES6.

###ES5
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

###ES6
```javascript
import appStoreValidator from 'app-store-validator';

const iTunesFacebook = '284882215';
appStoreValidator.iTunes.get(iTunesFacebook, (error, result) => {
	if(error) {
		console.error(error);
	}
	else {
		console.log(result);
	}
});
```

###Results
Both calls yield the same result object:
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