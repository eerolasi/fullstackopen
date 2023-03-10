describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('');
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    const user2 = {
      name: 'Toinen kayttaja',
      username: 'kayttaja',
      password: 'salasana',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2);
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Matti Luukkainen logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukk');
      cy.get('#password').type('salain');
      cy.get('#login-button').click();

      cy.contains('Wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });
    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('otsikko');
      cy.get('#author').type('kirjoittaja');
      cy.get('#url').type('osoite');
      cy.get('#create-button').click();
      cy.contains('otsikko');
    });
    it('User can like', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('otsikko');
      cy.get('#author').type('kirjoittaja');
      cy.get('#url').type('osoite');
      cy.get('#create-button').click();
      cy.get('#view').click();
      cy.get('#like-button').click();
      cy.get('#like-button').click();

      cy.contains('2');
    });
    it('User can delete own blog', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('otsikko');
      cy.get('#author').type('kirjoittaja');
      cy.get('#url').type('osoite');
      cy.get('#create-button').click();
      cy.get('#view').click();
      cy.get('#remove').click();
      cy.contains('remove').should('not.exist');
    });
    it('User cannot see the remove button if not own blog', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('otsikko');
      cy.get('#author').type('kirjoittaja');
      cy.get('#url').type('osoite');
      cy.get('#create-button').click();
      cy.login({ username: 'kayttaja', password: 'salasana' });
      cy.get('#view').click();
      cy.contains('likes');
      cy.contains('remove').should('not.exist');
    });
    it('Blogs are ordered according to likes', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('first');
      cy.get('#author').type('kirjoittaja');
      cy.get('#url').type('osoite');
      cy.get('#create-button').click();
      cy.contains('create new blog').click();
      cy.get('#title').type('second');
      cy.get('#author').type('author');
      cy.get('#url').type('website');
      cy.get('#create-button').click();

      cy.get('.blog').contains('first').parent().as('first');
      cy.get('.blog').contains('second').parent().as('second');
      cy.get('@first').contains('view').click();
      cy.get('@first').contains('like').click();
      cy.get('@second').contains('view').click();
      cy.get('@second').contains('like').click();
      cy.get('@second').contains('like').click();

      cy.get('.blog').eq(0).should('contain', 'second');
      cy.get('.blog').eq(1).should('contain', 'first');
    });
  });
});
