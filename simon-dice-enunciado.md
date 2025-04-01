**Ejercicio: Crea tu propio "Simón Dice"**

![image](https://cdn.dribbble.com/userupload/24388552/file/original-2bc982b88903b2298eed40b18ea60f3c.gif)

**Objetivo:**

En este ejercicio, desarrollarás una versión web del clásico juego de memoria "Simón Dice". El objetivo es crear una aplicación interactiva utilizando HTML, CSS y, principalmente, JavaScript Vanilla, que ponga a prueba la memoria del jugador replicando secuencias de colores cada vez más largas. Reforzarás tus habilidades en manipulación del DOM, manejo de eventos, lógica de arrays, temporizadores (`setTimeout`) y gestión del estado del juego.

**Descripción del Juego (Cómo Debe Funcionar):**

1.  **Inicio:** La pantalla muestra cuatro botones de colores (por ejemplo, verde, rojo, amarillo, azul), un indicador de nivel (que empieza en 0 o 1), un área de mensajes y un botón "Empezar".
2.  **Comienza la Partida:** Al pulsar "Empezar":
    *   El juego se inicializa (nivel 1).
    *   El ordenador elige un color al azar y lo añade a su secuencia secreta.
    *   El ordenador "muestra" la secuencia al jugador haciendo que el/los botón(es) correspondientes se iluminen (flashen) uno por uno, en orden.
3.  **Turno del Jugador:** Una vez que el ordenador ha mostrado la secuencia:
    *   El área de mensajes indica que es el turno del jugador ("¡Tu turno!").
    *   El jugador debe hacer clic en los botones de colores en el mismo orden en que se mostraron.
    *   Cada vez que el jugador hace clic en un botón, éste debe iluminarse brevemente como feedback visual.
4.  **Comprobación:**
    *   **Clic Correcto:** Si el color clicado por el jugador coincide con el color esperado en esa posición de la secuencia, el juego espera al siguiente clic (si la secuencia aún no ha terminado).
    *   **Secuencia Completada:** Si el jugador completa la secuencia correctamente (hace clic en el último color correcto de la secuencia actual), el juego hace una pausa breve, muestra un mensaje de éxito ("¡Correcto!"), incrementa el nivel y vuelve al paso 2 (el ordenador añade *otro* color a la secuencia y la muestra entera).
    *   **Clic Incorrecto:** Si el jugador hace clic en un color incorrecto en cualquier punto de la secuencia, el juego termina. Se muestra un mensaje de "¡Juego Terminado!" indicando el nivel alcanzado, y aparece un botón para "Jugar de Nuevo".
5.  **Reinicio:** El botón "Jugar de Nuevo" permite al jugador comenzar una partida desde cero.

**Requisitos Técnicos (Lo que Tienes que Implementar):**

**HTML (`index.html`):**

*   Crea la estructura básica: un contenedor principal.
*   Añade un título (`<h1>`).
*   Incluye elementos para mostrar el nivel actual (`<span id="level">`) y mensajes al usuario (`<p id="message">`).
*   Crea el "panel" de Simón: cuatro `<div>` o `<button>` que representen los colores, cada uno con un ID único (ej. `id="green"`, `id="red"`, etc.).
*   Añade los botones de control: "Empezar" (`id="start-button"`) y "Jugar de Nuevo" (`id="reset-button"`, inicialmente oculto).

**CSS (`style.css`):**

*   Estilos básicos para centrar el contenido y dar una apariencia agradable al contenedor.
*   Define los colores de fondo para cada uno de los cuatro botones de color.
*   Crea una clase CSS (ej. `.lit` o `.active`) que modifique la apariencia de un botón de color para que parezca "iluminado" (puedes usar `opacity`, `box-shadow`, `border`, o `transform: scale` para un efecto simple).
*   Estiliza los botones de control ("Empezar", "Jugar de Nuevo").
*   Asegúrate de que los botones de color tengan un `cursor: pointer;`.

**JavaScript (`script.js`) - ¡El Núcleo del Ejercicio!**

1.  **Variables Principales:**
    *   Define un array con los IDs de los colores disponibles (ej. `['green', 'red', 'yellow', 'blue']`).
    *   Necesitarás arrays para almacenar la secuencia generada por el juego (`gameSequence`) y la secuencia que introduce el jugador (`playerSequence`).
    *   Variables para rastrear el `level` actual y una variable booleana (`canPlayerClick` o `isPlayerTurn`) para saber si el jugador puede interactuar con los botones de colores.
2.  **Referencias al DOM:** Obtén referencias a los elementos HTML que necesitarás manipular (botones de color, botones de control, pantalla de nivel, pantalla de mensajes).
3.  **Función `startGame()`:**
    *   Resetea las variables del juego (nivel a 0, secuencias vacías).
    *   Oculta el botón "Jugar de Nuevo" y muestra/oculta el de "Empezar" según corresponda.
    *   Llama a la función para iniciar el primer nivel (`nextLevel()`).
4.  **Función `nextLevel()`:**
    *   Incrementa el `level`.
    *   Actualiza el indicador de nivel en la pantalla.
    *   Resetea `playerSequence`.
    *   Deshabilita los clics del jugador (`canPlayerClick = false`).
    *   Elige un nuevo color aleatorio y añádelo a `gameSequence`.
    *   Llama a la función que reproduce la secuencia visualmente (`playSequence()`).
5.  **Función `playSequence()`:**
    *   Itera sobre `gameSequence`.
    *   Usa `setTimeout` para crear un retardo entre la iluminación de cada color en la secuencia. Cada color debe "brillar" por un corto período.
    *   *Importante:* Después de que se haya mostrado el último color de la secuencia (y tras un breve retardo adicional), habilita los clics del jugador (`canPlayerClick = true`) y actualiza el mensaje ("¡Tu turno!").
6.  **Función `flashColor(colorId)` o `lightButton(colorId)`:**
    *   Recibe el ID de un color.
    *   Encuentra el elemento del botón correspondiente.
    *   Añade la clase CSS `.lit` al botón.
    *   Usa `setTimeout` para quitar la clase `.lit` después de un breve instante (ej. 300ms), creando el efecto de flash.
7.  **Manejador de Eventos para Clics del Jugador (`handlePlayerClick`):**
    *   Añade un event listener a cada botón de color (o usa delegación de eventos en el contenedor `.simon-pad`).
    *   Dentro del manejador:
        *   Verifica si `canPlayerClick` es `true`. Si no, no hagas nada.
        *   Obtén el `id` del botón clicado.
        *   Llama a `flashColor()` para dar feedback visual inmediato al jugador.
        *   Añade el color clicado a `playerSequence`.
        *   Llama a una función `checkAnswer()` pasándole el índice del último clic (`playerSequence.length - 1`).
8.  **Función `checkAnswer(currentIndex)`:**
    *   Compara `playerSequence[currentIndex]` con `gameSequence[currentIndex]`.
    *   **Si no coinciden:** Llama a `gameOver()`.
    *   **Si coinciden Y el jugador ha completado la secuencia** (`playerSequence.length === gameSequence.length`):
        *   Deshabilita los clics (`canPlayerClick = false`).
        *   Muestra un mensaje de éxito.
        *   Usa `setTimeout` para llamar a `nextLevel()` después de una pausa (ej. 1 segundo).
    *   **Si coinciden pero la secuencia no está completa:** No hagas nada (espera el siguiente clic del jugador).
9.  **Función `gameOver()`:**
    *   Deshabilita los clics (`canPlayerClick = false`).
    *   Muestra un mensaje de "Juego Terminado" con el nivel alcanzado.
    *   Muestra el botón "Jugar de Nuevo".
10. **Event Listeners Iniciales:** Asigna `startGame` al evento `click` de los botones "Empezar" y "Jugar de Nuevo".

