# T92 Proyecto Grupo 4
Proyecto: Sistema de Gestión para un Autolote 
Asignatura: Desarrollo de Aplicaciones Web I

# Pasos para probar el proyecto.

# Requisios
* tener instaldo node.js
* tener instalado MySQL, además de instalar la base de datos
* Postman para las pruebas de las APIS.

# Pasos a seguir
* clonar el repositorio
* reinstalar dependencias usando npm install, tanto enlas folders de client y server respectivamente
* la base de datos necesita un primer usuario par poder funcionar, se debe crear e insertar desde MySQL workbench, dicho usuario debe tener una contraseña generada en el proyecto, 

```console
INSERT INTO usuarios (nombre, correo, contraseña, rol)
VALUES (
    'Admin',
    'admin@autolote.com',
    '$2b$10$dKReoGOJTGzJ0hmvEM/2s.7OLOby1VyRfX0j/IsMiFAvgp1hCSjI6',
    'admin'
);
```
verificar que el hash es el mismo, para hacerlo, desde el proyecto abrir la consola y probar crear una contraseña nueva, en esta caso el hash brindando es para la contraseña 123456

```console
node -e "console.log(require('bcrypt').hashSync('123456', 10))"
````
