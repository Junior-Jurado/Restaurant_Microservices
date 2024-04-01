# Restaurant_Microservices

## Descripción

Este proyecto consiste en un sistema de gestión para un restaurante que ofrece una jornada de donación de comida a los residentes de la región. El restaurante permite pedir platos a la cocina de forma aleatoria, con la condición de que los ingredientes estén disponibles en la bodega de alimentos o se puedan adquirir en la plaza de mercado.

El sistema se basa en una arquitectura de microservicios que corren con Docker. Consta de una parte backend, que incluye microservicios y un API Gateway, y una parte frontend desarrollada en Angular.

## Backend (Microservicios)

Para ejecutar el proyecto, debe acceder a cada carpeta de microservicios y al API Gateway. Luego, ejecute `npm install` y `npm run start:dev` para arrancar cada microservicio y el API Gateway. Estos estarán disponibles en el puerto `localhost:3000`.

La URI para la base de datos MongoDB es `mongodb://localhost:27017/restaurant`.

### Documentación de la API

La documentación completa de la API se encuentra en el archivo `Microservices.postman_collection.json`. Puedes importar este archivo en Postman para acceder a los detalles de los endpoints, así como a ejemplos de solicitudes y respuestas.

### Despliegue de Microservicios con Docker

Para desplegar los microservicios en localhost, puedes utilizar el Dockerfile.dev proporcionado en la carpeta de cada microservicio. Este Dockerfile está configurado para crear imágenes Docker de los microservicios y ejecutarlos en contenedores locales.



## Frontend

Para ejecutar el frontend de forma local utilizando el proyecto de Angular, simplemente ejecuta el comando ng serve, lo que iniciará el servidor en localhost:4200.

El frontend interactúa con los microservicios (backend) que han sido desplegados en el servicio de Amazon EC2. Estos microservicios se pueden acceder a través de la dirección IP http://18.117.240.16 que en este caso la parte Front hecha angular consume

## Tema del Proyecto: Microservicios Restaurante

El restaurante ha decidido llevar a cabo una jornada de donación de comida, donde los comensales recibirán platos aleatorios. El sistema permite que el gerente del restaurante indique a la cocina qué plato preparar. La cocina selecciona aleatoriamente el plato y pide los ingredientes a la bodega de alimentos. Si los ingredientes no están disponibles en la bodega, se compran en la plaza de mercado. Una vez que la cocina recibe los ingredientes, prepara el plato y lo entrega.

### Funcionamiento

1. El gerente del restaurante solicita un nuevo plato a la cocina.
2. La cocina elige aleatoriamente un plato de entre 6 recetas disponibles.
3. La cocina solicita los ingredientes para preparar el plato a la bodega de alimentos.
4. La bodega de alimentos verifica si tiene los ingredientes necesarios. Si no, los compra en la plaza de mercado.
5. La cocina prepara el plato y lo entrega.

### Interfaz de Usuario

- Botón para pedir un plato, con la capacidad de recibir pedidos masivos.
- Visualización de las órdenes en preparación en la cocina.
- Visualización de los ingredientes y sus cantidades disponibles en la bodega de alimentos, así como el historial de compras en la plaza de mercado.
- Visualización del historial de pedidos realizados a la cocina.
- Visualización de las recetas con ingredientes y cantidades.

### Ingredientes Disponibles

- Tomato
- Lemon
- Potato
- Rice
- Ketchup
- Lettuce
- Onion
- Cheese
- Meat
- Chicken

Las recetas manejan cantidades de productos en unidades enteras.
