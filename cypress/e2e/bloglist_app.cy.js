describe('Blog List app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Avram Pease',
      username: 'apease0',
      password: 'sekret0'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
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

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="username"]').type('apease0')
      cy.get('input[name="password"]').type('sekret0')
      cy.get('button').click()
      cy.contains('blogs')
      cy.contains('Avram Pease logged in')
    })

    it.only('fails with wrong password', function() {
      cy.get('input[name="username"]').type('apease0')
      cy.get('input[name="password"]').type('sekret')
      cy.get('button').click()
      cy.get('.notification').contains('password is incorrect')
        .get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
        .get('.notification').should('have.css', 'border-style', 'solid')
    })

    it.only('fails with wrong username', function() {
      cy.get('input[name="username"]').type('apease01')
      cy.get('input[name="password"]').type('sekret0')
      cy.get('button').click()
      cy.get('.notification').contains('username does not exist')
        .get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
        .get('.notification').should('have.css', 'border-style', 'solid')
    })
  })

})