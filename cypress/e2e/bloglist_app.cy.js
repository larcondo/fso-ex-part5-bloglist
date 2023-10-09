describe('Blog List app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Avram Pease',
      username: 'apease0',
      password: 'sekret0'
    }
    const user2 = {
      name: 'Jane Doe',
      username: 'janed2015',
      password: 'blindspot'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
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

    it('User who create a blog can delete it', function() {
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

    it('Only the creator can see the delete button', function() {
      cy.createBlog({
        title: 'Versatile web-enabled array',
        author: 'Ilsa Fairman',
        url: 'http://adobe.com',
        likes: 0
      })
      cy.get('.blog').eq(0).as('firstblog')
      cy.get('@firstblog').within(() => {
        cy.get('.details-button').click()
        cy.get('.blog-details .remove-button').should('exist')
        cy.get('.blog-details .remove-button').should('contain', 'remove')
      })

      cy.logout()

      cy.login({ username: 'janed2015', password: 'blindspot' })
      cy.get('.blog').eq(0).as('firstblog')
      cy.get('@firstblog').within(() => {
        cy.get('.details-button').click()
        cy.get('.blog-details .remove-button').should('not.exist')
      })
    })

    it('the blogs are ordered according to likes - OP1', function() {
      const blogs = [{
        'title': 'Vision-oriented optimizing portal',
        'author': 'Mabelle Tobin',
        'url': 'https://people.com.cn',
        'likes': 137
      }, {
        'title': 'Diverse intangible capacity',
        'author': 'Kristien O\' Mahony',
        'url': 'https://ted.com',
        'likes': 330
      }, {
        'title': 'Versatile web-enabled array',
        'author': 'Ilsa Fairman',
        'url': 'http://adobe.com',
        'likes': 261
      }, {
        'title': 'Optimized stable database',
        'author': 'Gustave Gobell',
        'url': 'https://npr.org',
        'likes': 19
      }]

      cy.createBlog(blogs[0])
      cy.createBlog(blogs[1])
      cy.createBlog(blogs[2])
      cy.createBlog(blogs[3])
      cy.visit('http://localhost:5173')
      cy.get('.blog').eq(0).should('contain', 'Diverse intangible capacity')
    })

    it.only('the blogs are ordered according to likes - OP2', function() {
      const blogs = [{
        'title': 'Vision-oriented optimizing portal',
        'author': 'Mabelle Tobin',
        'url': 'https://people.com.cn',
        'likes': 137
      }, {
        'title': 'Diverse intangible capacity',
        'author': 'Kristien O\' Mahony',
        'url': 'https://ted.com',
        'likes': 330
      }, {
        'title': 'Versatile web-enabled array',
        'author': 'Ilsa Fairman',
        'url': 'http://adobe.com',
        'likes': 261
      }, {
        'title': 'Optimized stable database',
        'author': 'Gustave Gobell',
        'url': 'https://npr.org',
        'likes': 19
      }]

      // Order: 2 - 3 - 0 - 1
      // Likes: 5 - 3 - 2 - 1

      cy.get('button').contains('new blog').click()
      cy.fillForm(blogs[0])
      cy.get('button').contains('new blog').click().fillForm(blogs[1])
      cy.get('button').contains('new blog').click().fillForm(blogs[2])
      cy.get('button').contains('new blog').click().fillForm(blogs[3])

      // Likes for Blog0
      cy.toggleDetails(blogs[0].title)
      cy.clickLike()
      cy.clickLike()
      cy.toggleDetails(blogs[0].title)

      // Likes for Blog1
      cy.toggleDetails(blogs[1].title)
      cy.clickLike()
      cy.toggleDetails(blogs[1].title)

      // Likes for Blog2
      cy.toggleDetails(blogs[2].title)
      cy.clickLike()
      cy.clickLike()
      cy.clickLike()
      cy.clickLike()
      cy.clickLike()
      cy.toggleDetails(blogs[2].title)

      // Likes for Blog3
      cy.toggleDetails(blogs[3].title)
      cy.clickLike()
      cy.clickLike()
      cy.clickLike()
      cy.toggleDetails(blogs[3].title)

      cy.get('.blog').eq(0).contains(blogs[2].title)
      cy.get('.blog').eq(1).contains(blogs[3].title)
      cy.get('.blog').eq(2).contains(blogs[0].title)
      cy.get('.blog').eq(3).contains(blogs[1].title)
    })
  })

})