describe('Blog List app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('#login-form')
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.get('input[name="username"]')
    cy.get('input[name="password"]')
    cy.get('button')
  })
})