# Practica 11 - APIs asíncronas de gestión del sistema de ficheros, creación de procesos y creación de sockets de Node.js
[![Tests](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333281/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333281/actions/workflows/node.js.yml)
[![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333281/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333281/actions/workflows/coveralls.yml)
[![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333281/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101333281/actions/workflows/sonarcloud.yml)

## Introduccion 
En este informe trataremos una serie de ejercicios como crear una aplicación Express en TypeScript para gestionar un registro implica la creación de una API web que pueda recibir solicitudes HTTP de los clientes, procesar la información proporcionada en las solicitudes y responder con los datos solicitados.

En general, la combinación de Express y TypeScript proporciona una solución sólida y escalable para la gestión de registros.

Tambíen seguiremos avanzando en el desarrollo de cubrimiento, testing y seguridad del código usando Github Actions, Coveralls y Sonar Cloud. Seguimos utilizando documentación generada por Typedoc y comprobando el correcto funcionamiento por medio de las metodologías de desarrollo TDD usando Mocha y Chai.

## Modificacion

Desarrolle el siguiente ejercicio en el repositorio de su práctica.

Implemente un servidor Express en el que se exponga un punto de acceso JSON en la ruta '/execmd'. Al mismo tiempo, haga que el servidor devuelva, por defecto, un código de respuesta 404 cuando se intente acceder a una ruta no válida (vea el uso del método status de un objeto respuesta de Express).

Se espera que la URL que permite acceder a dicho punto de acceso contenga dos parámetros. El primer parámetro, denominado 'cmd', consistirá en un comando Unix/Linux, mientras que el segundo, denominado args, consistirá en las opciones con las que se desea ejecutar el comando. Tenga en cuenta que ambos parámetros son cadenas de caracteres. El primer parámetro correspondiente al comando a ejecutar es obligatorio, mientras que el de los argumentos es opcional. En caso de que la URL no contenga el parámetro 'cmd', se deberá devolver al cliente un código de respuesta 400.

En el resto de casos, el servidor deberá contestar con un objeto JSON:

        En caso de que se produzca un error durante la ejecución del comando y sus posibles argumentos, un objeto JSON con una propiedad error que contenga información acerca del error que ha ocurrido. Tenga en cuenta que, en los casos en los que el comando especificado no llegara a ejecutarse, por ejemplo, porque no existe, o se ejecutara produciendo una salida no satisfactoria, por ejemplo, porque se le pasan argumentos no válidos a un comando que si existe, el error correspondiente deberá devolverse en este tipo de objeto JSON. El código de respuesta asociado a este tipo de error sería un 500.
        En el caso de que el comando, con sus correspondientes argumentos, se ejecute correctamente, un objeto JSON con una propiedad output que contenga la salida emitida por el comando. El código asociado a esta respuesta, que es el valor por defecto, es el 200 (OK).

### modi_server.ts

```ts
import express, { Request, Response } from 'express';
import { exec } from 'child_process';

const app = express();

app.get('/execmd', (req: Request, res: Response) => {
  const cmd = req.query.cmd as string;
  const args = req.query.args as string;

  if (!cmd) {
    return res.status(400).send({ error: 'Parameter "cmd" is required' });
  }

  exec(`${cmd} ${args || ''}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send({ error: error.message });
    }

    if (stderr) {
      return res.status(500).send({ error: stderr });
    }

    res.send({ output: stdout });
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).send({ error: 'Not Found' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
Este código es una aplicación web construida en Node.js utilizando el framework Express. La aplicación escucha las solicitudes entrantes en el puerto 3000 y responde con el resultado de ejecutar un comando de shell proporcionado en la URL.

Primero, el código importa el módulo "express" y las interfaces "Request" y "Response" desde el módulo "express". También importa la función "exec" del módulo "child_process", que se utilizará para ejecutar comandos de shell.

Luego, se crea una instancia de la aplicación Express y se define una ruta para el método HTTP GET en '/execmd'. Cuando se recibe una solicitud GET en esta ruta, se extraen los parámetros "cmd" y "args" de la URL de la solicitud. Si el parámetro "cmd" no está presente, se devuelve una respuesta con un estado de 400 y un mensaje de error.

Luego, se ejecuta el comando de shell utilizando la función "exec" y se proporcionan los parámetros "cmd" y "args". Si se produce un error durante la ejecución del comando, se devuelve una respuesta con un estado de 500 y el mensaje de error. Si hay un mensaje de error en stderr, se devuelve una respuesta con un estado de 500 y el mensaje de error. De lo contrario, se devuelve una respuesta con un objeto JSON que contiene la salida del comando de shell.

Finalmente, se define un manejador de errores para responder a todas las demás solicitudes con un estado de 404 y un mensaje de error. Y se inicia la aplicación Express en el puerto 3000 y se imprime un mensaje en la consola indicando que el servidor está funcionando.

Implemente algunas pruebas con Mocha+Chai para comprobar el funcionamiento de su servidor. Tenga en cuenta que, para ello, el servidor deberá estar ejecutándose y que deberá llevar a cabo las peticiones HTTP haciendo uso de algún paquete como, por ejemplo, 'request'.

### servidor.spec.ts

```ts
import request from 'request';
import { expect } from 'chai';

describe('execmd endpoint', () => {
  const baseUrl = 'http://localhost:3000';

  it('should return 400 if cmd parameter is missing', (done) => {
    request(`${baseUrl}/execmd`, (error, response, body) => {
      expect(response.statusCode).to.equal(400);
      expect(JSON.parse(body)).to.deep.equal({ error: 'Parameter "cmd" is required' });
      done();
    });
  });

  it('should execute the specified command and return its output', (done) => {
    const cmd = 'echo';
    const args = 'hello world';
    const expectedOutput = 'hello world\n';

    request(`${baseUrl}/execmd?cmd=${cmd}&args=${args}`, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(body)).to.deep.equal({ output: expectedOutput });
      done();
    });
  });

  it('should return 500 if the specified command does not exist', (done) => {
    const cmd = 'thiscommanddoesnotexist';

    request(`${baseUrl}/execmd?cmd=${cmd}`, (error, response, body) => {
      expect(response.statusCode).to.equal(500);
      expect(JSON.parse(body)).to.have.property('error');
      done();
    });
  });
});
```


## Conclusion
El uso de HTTP y Express es fundamental en el desarrollo de aplicaciones web modernas y su utilización adecuada puede permitir la construcción de aplicaciones web seguras, escalables y eficientes. Tambien el uso de TypeScript  proporciona una solución sólida y escalable para la gestión de registros y permite el uso de herramientas como Github Actions, Coveralls y Sonar Cloud para asegurar la calidad del código. El uso de Typedoc y las metodologías de desarrollo TDD con Mocha y Chai también contribuyen a un proceso de desarrollo robusto y seguro.


## Referencias

1. https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif

2. https://chat.openai.com/

3. https://www.npmjs.com/package/@types/yargs

4. https://www.npmjs.com/package/chalk