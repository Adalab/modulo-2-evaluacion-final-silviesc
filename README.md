# Proyecto: Evaluación final módulo Javascript

El ejercicio consiste en crear una página web que sirva como buscador de series de anime, donde el usuario pueda des/marcar las series como favoritas y guardarlas en local storage. 


# Estructura

El usuario, nada más cargar la página, verá una barra de navegación para que pueda introducir la serie que desea buscar y, a la derecha, tendrá dos botones: un botón de "Enviar" para ejecutar la búsqueda y un botón de "Reset" para borrar todos los resultados.

Cuando el usuario haga click en el botón enviar, la web se conectará a la API de series de anime que nos ha sido proporcionada y mostrará al usuario en el apartado de "Resultados" tanto los títulos de las películas que coinciden con su búsqueda como sus fotos de portada. 

Si el usuario quiere marcar alguna serie como favorita, tendrá que hacer click encima del título o de la imagen correspondiente, que cambiará de color y se añadirá también al apartado de "Series Favoritas". En caso de que vuelva a marcar la misma película dos veces o más, aparecerá un mensaje debajo del buscador de series avisando al usuario que esa serie ya está marcada como favorita y no se duplicará en la sección de favoritas.

Si el usuario desease eliminar una serie del apartado de favoritos, tan solo tendría que hacer click en el icono de la equis que acompaña al título. Asimismo, si desease eliminar todas las películas de favoritos y los resultados de su búsqueda, bastaría con hacer click en el botón de "Reset".

Por último, todos estos cambios se irán guardando en local storage para que, en caso de refrescar la página, se sigan mostrando las series que el usuario ha marcado como favoritas en el apartado correspondiente.

# Estilos

La maquetación para este ejercicio ha sido libre, incluyendo los elementos que se pedían en el enunciado y respetando sus funcionalidades.

# Puesta en marcha 

- Para visualizar la web, basta con hacer click en el enlace de Github Pages que se encuentra en la parte superior derecha de la pantalla, en el apartado de “About”. 

- En caso de querer visualizarlo en local, los pasos a seguir son los siguientes:

    1. Instalación de Visual Studio Code.
    2. Clonar el repositorio en la terminal de VS Code con el siguiente comando: “ git clone https://beta.adalab.es/modulo-2-evaluacion-final-silviesc/“.
    3. Descargar todo el proyecto mediante el comando “git pull”.
    4. Realizar el comando “npm install” para instalar los node modules necesarios para la ejecución del proyecto.
    5. Introducir en la terminal el comando “npm run dev” para que sea mostrado por el navegador.

- La web es compatible con los navegadores Mozilla, Chrome y Safari. 

# Estado del proyecto

El proyecto quedará finalizado y entregado para su corrección el lunes 22 de enero de 2023. Quedaré pendiente de feedback y, en caso de hacer alguna modificación posterior, será desde la rama "dev". 

# Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.

