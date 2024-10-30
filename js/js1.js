/* DEPENDE DEL TIEMPO
// Variables globales
let score = 0;
let wordCount = 0;  // Contador de palabras atrapadas
let timeRemaining = 60; // Tiempo de juego en segundos
let gameInterval;
let wordsFalling = [];
const words = ["sol", "gato", "ratón", "luna", "flor", "cielo"];
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const wordCountElement = document.getElementById('word-count'); // Elemento para el contador de palabras
const timeElement = document.getElementById('time');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const finalWordCountElement = document.getElementById('final-word-count'); // Elemento para palabras atrapadas
const restartGameButton = document.getElementById('restart-game');
const basket = document.getElementById('basket');  // Cesta

// Mover la cesta con las teclas de flecha
document.addEventListener('keydown', function(event) {
    const basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue('left'));

    // Mover hacia la izquierda
    if (event.key === 'ArrowLeft' && basketLeft > 0) {
        basket.style.left = `${basketLeft - 20}px`;
    }

    // Mover hacia la derecha
    if (event.key === 'ArrowRight' && basketLeft < gameContainer.offsetWidth - basket.offsetWidth) {
        basket.style.left = `${basketLeft + 20}px`;
    }
});

// Mover la cesta en dispositivos móviles
gameContainer.addEventListener('touchmove', function(event) {
    const touchX = event.touches[0].clientX;
    const gameContainerRect = gameContainer.getBoundingClientRect();
    const basketWidth = basket.offsetWidth;

    // Asegurarse de que la cesta no salga del contenedor
    if (touchX >= gameContainerRect.left + basketWidth / 2 && touchX <= gameContainerRect.right - basketWidth / 2) {
        basket.style.left = `${touchX - gameContainerRect.left - basketWidth / 2}px`;
    }
});


// Función para crear y lanzar palabras
function dropWord() {
    const word = document.createElement('div');
    word.classList.add('word');
    word.textContent = words[Math.floor(Math.random() * words.length)];

    const startPositionX = Math.random() * (gameContainer.offsetWidth - 100);
    word.style.left = `${startPositionX}px`;
    word.style.top = '0px';
    gameContainer.appendChild(word);
    wordsFalling.push(word);

    // Animar la caída de la palabra
    let wordFallInterval = setInterval(function() {
        let wordTop = parseInt(word.style.top);
        if (wordTop < gameContainer.offsetHeight - 50) {
            word.style.top = `${wordTop + 3}px`;
        } else {
            // Detectar colisión con la cesta
            const basketRect = basket.getBoundingClientRect();
            const wordRect = word.getBoundingClientRect();

            if (
                wordRect.left < basketRect.right &&
                wordRect.right > basketRect.left &&
                wordRect.bottom > basketRect.top
            ) {
                score += 10; // Sumar puntos por cada palabra atrapada
                wordCount++;  // Aumentar el contador de palabras atrapadas
                scoreElement.textContent = score;
                wordCountElement.textContent = wordCount;  // Mostrar palabras atrapadas
                gameContainer.removeChild(word); // Eliminar palabra atrapada
                clearInterval(wordFallInterval);
                wordsFalling.splice(wordsFalling.indexOf(word), 1); // Eliminarla del array de palabras
            } else if (wordTop >= gameContainer.offsetHeight - 50) {
                // Si la palabra cae y no es atrapada
                gameContainer.removeChild(word);
                clearInterval(wordFallInterval);
                wordsFalling.splice(wordsFalling.indexOf(word), 1);
            }
        }
    }, 20);

    // Llamar a esta función de nuevo en un intervalo de tiempo
    setTimeout(dropWord, 1500); // Crear una nueva palabra cada 1.5 segundos
}

// Iniciar el temporizador del juego
function startTimer() {
    gameInterval = setInterval(function() {
        timeRemaining--;
        timeElement.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            endGame();
        }
    }, 1000);
}

// Finalizar el juego
function endGame() {
    clearInterval(gameInterval);
    wordsFalling.forEach(word => gameContainer.removeChild(word)); // Eliminar palabras que sigan cayendo
    wordsFalling = [];
    gameOverElement.style.display = 'block';
    finalScoreElement.textContent = score;  // Mostrar el puntaje final
    finalWordCountElement.textContent = wordCount;  // Mostrar el número de palabras atrapadas
}

// Reiniciar el juego
restartGameButton.addEventListener('click', function() {
    score = 0;
    wordCount = 0;  // Reiniciar el contador de palabras
    timeRemaining = 30;
    scoreElement.textContent = score;
    wordCountElement.textContent = wordCount;  // Reiniciar el número de palabras atrapadas en pantalla
    timeElement.textContent = timeRemaining;
    gameOverElement.style.display = 'none';
    startGame();
});

// Iniciar el juego
function startGame() {
    dropWord();
    startTimer();
}

// Iniciar el juego por primera vez
startGame();
*/
// CAE NUMERO DETERMINADO DE PALABRAS 
let score = 0;
let wordCount = 0; // Contador de palabras atrapadas
let totalWords = 0; // Contador de palabras lanzadas
const maxWords = 10; // Número máximo de palabras en el juego
const wordsFalling = [];
const words = ["sol", "gato", "ratón", "luna", "flor", "cielo"];
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const wordCountElement = document.getElementById('word-count');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const finalWordCountElement = document.getElementById('final-word-count');
const restartGameButton = document.getElementById('restart-game');
const basket = document.getElementById('basket');

// Mover la cesta con las teclas de flecha
document.addEventListener('keydown', function(event) {
    const basketLeft = parseInt(window.getComputedStyle(basket).getPropertyValue('left'));
    if (event.key === 'ArrowLeft' && basketLeft > 0) {
        basket.style.left = `${basketLeft - 20}px`;
    }
    if (event.key === 'ArrowRight' && basketLeft < gameContainer.offsetWidth - basket.offsetWidth) {
        basket.style.left = `${basketLeft + 20}px`;
    }
});
// Mover la cesta en dispositivos móviles
gameContainer.addEventListener('touchmove', function(event) {
    const touchX = event.touches[0].clientX;
    const gameContainerRect = gameContainer.getBoundingClientRect();
    const basketWidth = basket.offsetWidth;

    // Asegurarse de que la cesta no salga del contenedor
    if (touchX >= gameContainerRect.left + basketWidth / 2 && touchX <= gameContainerRect.right - basketWidth / 2) {
        basket.style.left = `${touchX - gameContainerRect.left - basketWidth / 2}px`;
    }
});

// Función para crear y lanzar palabras
function dropWord() {
    if (totalWords >= maxWords) {
        // No se lanzarán más palabras, pero aún esperamos a que terminen de caer
        return;
    }

    const word = document.createElement('div');
    word.classList.add('word');
    word.textContent = words[Math.floor(Math.random() * words.length)];
    const startPositionX = Math.random() * (gameContainer.offsetWidth - 100);
    word.style.left = `${startPositionX}px`;
    word.style.top = '0px';
    gameContainer.appendChild(word);
    wordsFalling.push(word);
    totalWords++;

    let wordFallInterval = setInterval(function() {
        let wordTop = parseInt(word.style.top);
        if (wordTop < gameContainer.offsetHeight - 50) {
            word.style.top = `${wordTop + 2}px`; // Aumentamos la velocidad de caída aquí
        } else {
            const basketRect = basket.getBoundingClientRect();
            const wordRect = word.getBoundingClientRect();
            if (
                wordRect.left < basketRect.right &&
                wordRect.right > basketRect.left &&
                wordRect.bottom > basketRect.top
            ) {
                score += 10;
                wordCount++;
                scoreElement.textContent = score;
                wordCountElement.textContent = wordCount;
            }

            gameContainer.removeChild(word);
            clearInterval(wordFallInterval);
            wordsFalling.splice(wordsFalling.indexOf(word), 1);

            // Comprobar si todas las palabras han caído
            if (totalWords === maxWords && wordsFalling.length === 0) {
                endGame();
            }
        }
    }, 20);

    // Crear una nueva palabra cada 1.5 segundos
    setTimeout(dropWord, 1500);
}

// Finalizar el juego cuando todas las palabras hayan caído
function endGame() {
    gameOverElement.style.display = 'block';
    finalScoreElement.textContent = score;
    finalWordCountElement.textContent = wordCount;
}

// Reiniciar el juego
restartGameButton.addEventListener('click', function() {
    score = 0;
    wordCount = 0;
    totalWords = 0; // Reiniciar el número de palabras lanzadas
    scoreElement.textContent = score;
    wordCountElement.textContent = wordCount;
    gameOverElement.style.display = 'none';
    startGame();
});

// Iniciar el juego
function startGame() {
    dropWord();
}

// Iniciar el juego por primera vez
startGame();
