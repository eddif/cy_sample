## Notes: 
* Using latest version of Cypress (6.1)
* Ran into random issue on Chrome(87) where Cypress failed to finish typing string in text boxes before moving to the next field
    * Seems stable on Firefox (81)
    * I did not invest time into troubleshooting
    * See related bug: https://github.com/cypress-io/cypress/issues/5480

## Execute:
* clone project
* run `npm install`
* run `npx cypress open` or `npm run start`

## Exercise: 
1. Navigate to https://demoblaze.com
2. Click signup and create a new account
3. Login to your account
4. Add 'Samsung Galaxy S6" to your cart
5. Navigate to the cart, and verify that you have the correct phone model
