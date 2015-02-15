## Angular Form validation Demo

Using Chrome, run program with a provided node environment (or MAMP stack) to prevent Cross Origin request error by XMLHttpRequest (Angular templating)

## Setup
* npm install
* node server.js
* Open Chrome at localhost:3000

## Development
* Default Sass compiler
* Browserify bundle: browserify app.js -o bundled.js

## Notes
* Validation is done using Angular provided default functionality as well as having a custom directive for validating already existing Personal Identification Numbers (henkilötunnus/PIN). If a given PIN exists in the registry, error message is provided.
* PIN is also validated loosely by ng-pattern which checks that first 6 chars are digits, 7th char is one of '-', '+' or 'A/a'. 8th to 10th chars are digits and the last one is either a digit or letter between A-Z/a-z.
* When editing a person, birthdate and PIN numbers are disabled on purpose, as it is very unlikely for those field values to change.
* The demo is intended to be used on Chrome.