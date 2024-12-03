# proyect-react

An Electron application with React

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

### Funcionalidad


- Aplicacion de React que utiliza los componentes necesarios para la creacion, eliminacio y edicion de una tarea

# CreateElement

- Tenemos el Componente CreateElement que es donde se encuentra el componente principal y todemos ver como recibe bastantes parametros son los estados y las funciones para el estado
- Luego mas abajo tenemos las funciones donde manejamos los estados pasados por parametros donde en final de cada funcion devolves a la funcion de set"Lo que sea" la nueva lista que deseamos tener
- Finalmente tenemos la parte html que queremos renderizar para que se muestre


# CreateView

- Componente donde tendremos la creacion de la tarea con un formulario. Pasamos paremetros con el estado de la tarea y su funcion para una vez creado el objeto tarea añadirlo al estado
- y ademas los gurdamos en la base de datos para tener persistencia

# EditView

- Componente paracido al CreateView con un formulario tambien, pero esa vez para cambiar los datos de la tarea selccionada. Como en CreateView usamos el import useNavigate con Rutas definidas en App
- para poder cambiar entre componentes. Recibe parametros tambien de estados y funciones para actulizar a la lista de tareas es nuevo objeto tarea actualizado, ademas de persistencia de datos

# TaskItem

- Componente donde simplemnte creamos la forma de la tarjeta usando un libreria llamada antd. Modifico a mis necesidades los elementos como eliminar, editar o ver la tarjeta con detalle

  
