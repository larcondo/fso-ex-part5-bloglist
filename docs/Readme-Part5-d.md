# Part 5 - Testing React apps

### Part d - End to end testing

En los últimos ejercicios de esta parte, realizaremos algunos tests E2E para nuestra aplicación de blogs.

Se **debe chequear la [documentación](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) de Cypress**.
Es especialmente recomendable leer [Introduction to Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Can-Be-Simple-Sometimes), en la que afirma lo siguiente:

> Esta es la guía más importante para entender cómo hacer pruebas con Cypress. Léela. Compréndela.

- [Exercise 5.17](#517---bloglist-end-to-end-testing-step1)
- [Exercise 5.18](#518---bloglist-end-to-end-testing-step2)
- [Exercise 5.19](#519---bloglist-end-to-end-testing-step3)
- [Exercise 5.20](#520---bloglist-end-to-end-testing-step4)
- [Exercise 5.21](#521---bloglist-end-to-end-testing-step5)
- [Exercise 5.22](#522---bloglist-end-to-end-testing-step6)
- [Exercise 5.23](#523---bloglist-end-to-end-testing-step7)

## 5.17 - bloglist end to end testing, step1
Configurar Cypress para tu proyecto. Crear un test para verificar que la aplicación muestra el formulario de login por defecto.

La estructura del test debe ser como el que sigue:

```js
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    // ...
  })
})
```

El *beforeEach* debe vaciar la base de datos utilizando, por ejemplo, el método que se usó en el [material](https://fullstackopen.com/en/part5/end_to_end_testing#controlling-the-state-of-the-database).

## 5.18 - bloglist end to end testing, step2
Crear test para el logueo de usuario. Testear intentos exitosos y fallidos de logueo. Crear un nuevo usuario en el bloque *beforeEach* para los tests.

La estructura del test se extiende así:

```js
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create here a user to backend
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    // ...
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // ...
    })

    it('fails with wrong credentials', function() {
      // ...
    })
  })
})
```

*Ejercicio de bonus opcional:* Verificar que la notificación mostrada cuando el login es fallido se muestra en color rojo.

## 5.19 - bloglist end to end testing, step3
Crear un test que verifique que un usuario logueado puede crear un nuevo blog. La estructura del test puede ser como la siguiente:

```js
describe('Blog app', function() {
  // ...

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
    })

    it('A blog can be created', function() {
      // ...
    })
  })

})
```

El test tiene que asegurar que el nuevo blog se agrega a la lista de todos los blogs.

## 5.20 - bloglist end to end testing, step4
Crear un test que confirme que los usuarios pueden dar like a un blog.

## 5.21 - bloglist end to end testing, step5
Crear un test que asegure que el usuario que creó un blog puede eliminarlo.

## 5.22 - bloglist end to end testing, step6
Crear un test que asegure que solo el creador y nadie más puede ver el botón de eliminar el blog.

## 5.23 - bloglist end to end testing, step7
Crear un test que verifique que los blogs son ordenados de acuerdo al número de likes mostrando primero el blog con más likes.

*Este ejercicio es bastante más complicado que los anteriores.* Una solución es agregar una determinada clase al elemento que envuelve el contenido del blog y utilizar el método [eq](https://docs.cypress.io/api/commands/eq#Syntax) para obtener el elemento blog con un índice específico:

```js
cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
```

Notar que podríamos tener problemas si hacemos click en el botón like muchas veces seguidas. Puede ser que Cypress realice los clicks tan rápido que no haya tiempo para actualizar el estado de la app entre clicks. Un remedio para esto es esperar por el número de likes para actualizar entre todos los clicks.