// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem('blLoggedUser', JSON.stringify(body))
      cy.visit('http://localhost:5173')
    })
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('blLoggedUser')).token}`
    }
  })
  // .then(() => cy.visit('http://localhost:5173'))
})

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('blLoggedUser')
  cy.visit('http://localhost:5173')
})

Cypress.Commands.add('fillForm', (blog) => {
  cy.get('.input-title').type(blog.title)
  cy.get('.input-author').type(blog.author)
  cy.get('.input-url').type(blog.url)
  cy.get('#create-button').click()
})

Cypress.Commands.add('toggleDetails', title => {
  cy.get('.blog')
    .contains(title)
    .within(() => {
      cy.get('.details-button').click()
    })
})

Cypress.Commands.add('clickLike', () => {
  cy.intercept('PUT', '/api/blogs/*').as('likePut')
  cy.get('.like-button')
    .click()
    .wait('@likePut')
    .its('response.statusCode')
    .should('eq', 200)
})