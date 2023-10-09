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

    it('fails with wrong password', function() {
      cy.get('input[name="username"]').type('apease0')
      cy.get('input[name="password"]').type('sekret')
      cy.get('button').click()
      cy.get('.notification').contains('password is incorrect')
        .get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
        .get('.notification').should('have.css', 'border-style', 'solid')
    })

    it('fails with wrong username', function() {
      cy.get('input[name="username"]').type('apease01')
      cy.get('input[name="password"]').type('sekret0')
      cy.get('button').click()
      cy.get('.notification').contains('username does not exist')
        .get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
        .get('.notification').should('have.css', 'border-style', 'solid')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'apease0', password: 'sekret0' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('.input-title').type('This blog is a test blog')
      cy.get('.input-author').type('Test Author')
      cy.get('.input-url').type('root:testblogs.net/1')
      cy.get('#create-button').click()

      cy.get('.notification').contains('a new blog This blog is a test blog by Test Author added')
      cy.get('.blog').should('have.length', 1)
      cy.get('.blog').eq(0).should('contain', 'This blog is a test blog Test Author')
      cy.get('.blog').eq(0).should('not.contain', 'root:testblogs.net/1')
    })
    
    it('Users can like a blog', function() {
      cy.createBlog({
        title: 'Distributed radical algorithm',
        author: 'Valerye Kermath',
        url: 'https://people.com.cn',
        likes: 0
      })
      cy.get('.blog').eq(0).as('firstblog')
      cy.get('@firstblog').within(() => {
        cy.get('.details-button').should('contain', 'view')
        cy.get('.details-button').click()
        cy.get('.blog-details .blog-likes').should('contain', 'likes 0')
        cy.get('.like-button').eq(0).click()
        cy.get('.blog-details .blog-likes').should('contain', 'likes 1')
        cy.get('.blog-details .blog-likes').should('not.contain', 'likes 0')
      })
    })

    it.only('User who create a blog can delete it', function() {
      cy.createBlog({
        title: 'Versatile web-enabled array',
        author: 'Ilsa Fairman',
        url: 'http://adobe.com',
        likes: 0
      })
      cy.get('.blog').eq(0).as('firstblog')
      cy.get('@firstblog').within(() => {
        cy.get('.details-button').should('contain', 'view')
        cy.get('.details-button').click()
        cy.get('.blog-details .blog-user-name').should('contain', 'Avram Pease')
        cy.get('.blog-details .remove-button').should('exist')
        cy.get('.blog-details .remove-button').click()
      })
      cy.get('.notification')
        .should('contain', 'deleted blog: Versatile web-enabled array')
        .and('have.css', 'border-style', 'solid')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

        cy.get('.blog').should('not.exist')
    })
  })

})