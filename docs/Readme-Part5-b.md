# Part 5 - Testing React apps

### Part b - props.children and proptypes

- Exercise 5.5
- Exercise 5.6
- Exercise 5.7
- Exercise 5.8
- Exercise 5.9
- Exercise 5.10
- Exercise 5.11
- Exercise 5.12

## 5.5 - Blog list frontend, step5
Cambiar el formulario de creación de entradas de blog para que sólo se muestre cuando corresponda. Utilice una funcionalidad similar a la mostrada [anteriormente en esta parte del material del curso](https://fullstackopen.com/en/part5/props_children_and_proptypes#displaying-the-login-form-only-when-appropriate).
Si se desea, podemos utilizar el componente *Togglable* definido en la parte 5.

Por defecto, el formulario no está visible:

<img src="https://fullstackopen.com/static/de4cfabdf46a837f1f0bfdba4fd27d67/5a190/13ae.png" alt="imagen" width="600" />

Se expande cuando se hace click en el botón *create new blog*

<img src="https://fullstackopen.com/static/0cb27abc7b56ba5ecdd7e9d48d325c87/5a190/13be.png" alt="imagen" width="600" />

El formulario se cierra cuando un nuevo blog es creado.

## 5.6 - Blog list frontend, step6
Separar el formulario para crear un nuevo blog en su propio componente (si aún no se ha hecho), y mover todos los estados requeridos para crear un nuevo blog a dicho componente.

El componente debe funcionar como el componente *NoteForm* de [esta parte](https://fullstackopen.com/en/part5/props_children_and_proptypes) del material.

## 5.7 - Blog list frontend, step7
Añadir un botón en cada blog, que controle si todos los detalles del blog se muestran o no.

Los detalles completos del blog se muestran cuando se hace click en el botón.

<img src="https://fullstackopen.com/static/b49e9ca45d0582829eed343baad44910/5a190/13ea.png" alt="imagen" width="600" />

Y los detalles se ocultan cuando el botón es clickeado de nuevo.

A esta altura, no es necesario que el botón *like* haga nada.

La aplicación mostrada en la imagen tiene CSS adicional para mejorar la apariencia.

Es fácil añadir estilos a la aplicación como se mostró en la parte 2 utilizando estilos [inline](https://fullstackopen.com/en/part2/adding_styles_to_react_app#inline-styles):

```js
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      // ...
  </div>
)}
```

<u>Nota:</u> aunque la funcionalidad implementada en esta parte es casi idéntica a la funcionalidad proporcionada por el componente *Togglable*, el componente no puede ser utilizado directamente para lograr el comportamiento deseado. La solución más sencilla será añadir un estado a la entrada del blog que controle la forma en que se muestra la entrada del blog.

## 5.8 - Blog list frontend, step8
Nos damos cuenta que algo anda mal. Cuando un nuevo blog es creado en la aplicación, el nombre del usuario que agregó el blog no se muestra en los detalles del blog:

<img src="https://fullstackopen.com/static/4c1a13b22d33df750f24a6e136e7abc1/5a190/59new.png" alt="imagen" width="600" />

Cuando se recarga el navegador, la información del usuario se muestra. Esto no es aceptable, encontrar el problema y realizar la corrección necesaria.

## 5.9 - Blog list frontend, step9
Implementar la funcionalidad para el botón de *like*. Los likes son incrementados realizando una solicitud HTTP `PUT` a la dirección única del blog en el backend.

Dado que la operación de backend sustituye a toda la entrada del blog, tendrá que enviar todos sus campos en el cuerpo de la solicitud.

Si queremos añadir un like a la siguiente entrada del blog:

```js
{
  _id: "5a43fde2cbd20b12a2c34e91",
  user: {
    _id: "5a43e6b6c37f3d065eaaa581",
    username: "mluukkai",
    name: "Matti Luukkainen"
  },
  likes: 0,
  author: "Joel Spolsky",
  title: "The Joel Test: 12 Steps to Better Code",
  url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
},
```

Deberíamos hacer una solicitud HTTP PUT a la dirección /api/blogs/5a43fde2cbd20b12a2c34e91 con la siguiente 'request data':

```js
{
  user: "5a43e6b6c37f3d065eaaa581",
  likes: 1,
  author: "Joel Spolsky",
  title: "The Joel Test: 12 Steps to Better Code",
  url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
}
```

El backend también debe actualizarse para gestionar la referencia del usuario.

> **Una última advertencia:** si notamos que estamos utilizando `async/await` y el método `then` en el mismo código, es casi seguro que estamos haciendo algo mal. En este caso usar uno u otro, nunca utilizar ambos a la vez "por si acaso".

## 5.10 - Blog list frontend, step10
Modificar la aplicación para mostrar los blogs por el número de *likes*. El ordenamiento de los blogs puede ser realizado con el método de arrays [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

## 5.11 - Blog list frontend, step11
Agregar un nuevo botón para eliminar entradas de blogs. Además, implementar la lógica para eliminar entradas de blogs en el frontend.

La aplicación podría lucir de la siguiente manera:

<img src="https://fullstackopen.com/static/87b7180f1f10ce670af1bc21f50233ec/5a190/14ea.png" alt="imagen" width="600" />

El diálogo de confirmación para eliminar una entrada de blog es fácil de implementar con la función [window.confirm](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm).

Mostrar el botón de eliminar entradas de blog solo si el blog fue añadido por el usuario logueado.

## 5.12 - Blog list frontend, step12
Definir PropTypes para uno de los componentes de la aplicación y añadir ESLint al proyecto. Definir la configuración de acuerdo a tu gusto. Corregir todos los errores del linter.

Vite installa ESLint en el proyecto por defecto, así que todo lo que tenemos que hacer es definir la configuración deseada en el archivo *.eslintrc.cjs*.
