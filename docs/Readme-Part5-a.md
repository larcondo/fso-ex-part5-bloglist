# Part 5 - Testing React apps (Part a)

- Exercise 5.1
- Exercise 5.2
- Exercise 5.3
- Exercise 5.4

## 5.1 - bloglist frontend, step1

Clonar desde [GitHub](https://github.com/fullstack-hy2020/bloglist-frontend) la aplicación con el comando:
```console
$ git clone https://github.com/fullstack-hy2020/bloglist-frontend
```

*Eliminar la configuración de git de la aplicación clonada*
```console
$ cd bloglist-frontend   // go to cloned repository
$ rm -rf .git
```

La aplicación se inicia de la forma habitual, pero primero se tienen que instalar sus dependencias:
```console
$ npm install
$ npm run dev
```

Implementar la funcionalidad de login para el frontend. El token devuelto con un exitoso login es alacenado en el estado de la app `user`.

Si un usuario no está logueado, *solo* es visible el formulario de login.

<img src="https://fullstackopen.com/static/7974958a48f7a4e873550b1b85bd8cbd/5a190/4e.png" alt="imagen" width="600" />

Si el usuario está logueado, se muestran el nombre del usuario y la lista de blogs. 

<img src="https://fullstackopen.com/static/62a606d23ac2c2c96918567b8a8c7b32/5a190/5e.png" alt="imagen" width="600" />

Los detalles del usuario logueado no deben ser almacenados en el `local storage` todavía.

<u>Nota:</u> Se puede implementar el rendering condicional del formulario de login como en este ejemplo:

```js
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          //...
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
```

## 5.2 - bloglist frontend, step2
Hacer '*permanente*' el login utilizando el `local storage`. También, implementar una forma para desloguearse (log-out).

<img src="https://fullstackopen.com/static/fa111e6eccf20340b5258c12553d2ea6/5a190/6e.png" alt="imagen" width="600" />

Asegurarse de que el navegador no '*recuerde*' los detalles del usuario luego del deslogueo.

## 5.3 - bloglist frontend, step3
Expandir la aplicación para permitirle a los usuarios logueados agregar nuevos blogs.

<img src="https://fullstackopen.com/static/b9f4cf7f481e4f1358be610031afe219/5a190/7e.png" alt="imagen" width="600" />

## 5.4 - bloglist frontend, step4

Implementar notificaciones que informen al usuario acerca de operaciones exitosas o no en la parte superior de la página. Por ejemplo, cuando se agrega un nuevo blog, se puede mostrar la siguiente modificación:

<img src="https://fullstackopen.com/static/58838a80180d9d94fb4bc3673a8a67c0/5a190/8e.png" alt="imagen" width="600" />

Un intento de logueo fallido puede mostrar la siguiente notificación:

<img src="https://fullstackopen.com/static/5f30f6f454735133b39d706a3fa7f9c1/5a190/9e.png" alt="imagen" width="600" />

Las notificaciones deben ser visibles durante unos segundos. No es obligatorio añadir colores.
