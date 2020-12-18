/// <reference types="cypress" />
import { app, page } from '../support/app-ids'

context('Cart', () => {
    beforeEach(() => {
        cy.visit('')
        cy.clearCookies()

    })

    function getRandomChars() {
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        return `test${id}`
    }

    it('Should be able to add item to cart', () => {

        let userName = getRandomChars()
        let userPass = 'test123'

        //SIGNUP
        cy.get(app.signup_NavLink).click()
        cy.get(app.signupUsername_Textbox).clear().type(userName)
        cy.get(app.signupPassword_Textbox).clear().type(userPass)
        cy.get('.modal-footer').within(() => {
            cy.contains('Sign up').click() //signup button
        })

        //LOGIN
        cy.get(app.login_NavLink).click()
        cy.get(app.loginUsername_Textbox).clear().type(userName)
        cy.get(app.loginPassword_Textbox).clear().type(userPass)
        cy.get('.modal-footer').within(() => {
            cy.contains('Log in').click() //login button
        })

        //VISIT PRODUCT PAGE
        cy.visit(page.product_SamsungGalaxyS6)
        cy.get(app.addToCart_Button).click()

        //VISIT CART PAGE
        cy.intercept('POST', 'https://api.demoblaze.com/viewcart').as('postViewCart')
        cy.visit(page.cart)

        //ASSERT API
        cy.wait('@postViewCart').then(interception => {
            const response = interception.response.body.Items
            expect(response[0]).to.have.property("prod_id", 1)
        })

        //ASSERT UI
        cy.get(app.cartProductTable).within(() => {
            cy.get('tr').should('have.length', 1)
            cy.get('tr').eq(0).contains("Samsung galaxy s6")
        })
    })
})