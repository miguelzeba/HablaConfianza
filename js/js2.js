const articles = document.querySelectorAll('.article');
const dropzones = document.querySelectorAll('.dropzone');
const checkAnswersButton = document.getElementById('check-answers');
const resultElement = document.getElementById('result');
const buttonsContainer = document.getElementById('buttons-container');
const playAgainButton = document.getElementById('play-again');
const goBackButton = document.getElementById('go-back');

// Permitir que los elementos sean arrastrables
articles.forEach(article => {
    article.addEventListener('dragstart', dragStart);
});

// Permitir que las imágenes reciban los artículos
dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', drop);
});

// Función cuando se empieza a arrastrar
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
}

// Función cuando el artículo se mueve sobre la zona de destino
function dragOver(e) {
    e.preventDefault();
    if (!e.target.classList.contains('has-article')) {
        e.target.classList.add('dragover');
    }
}

// Función cuando se deja la zona de destino
function dragLeave(e) {
    e.target.classList.remove('dragover');
}

// Función cuando se suelta el artículo en la zona correcta
function drop(e) {
    e.preventDefault();
    e.target.classList.remove('dragover');
    
    // Solo permite un artículo por objeto (si no tiene clase 'has-article')
    if (!e.target.classList.contains('has-article')) {
        const articleId = e.dataTransfer.getData('text');
        const articleElement = document.getElementById(articleId).cloneNode(true);
        articleElement.setAttribute('draggable', false);  // Deshabilitar arrastrar el artículo copiado
        
        // Crear una pequeña "X" para remover el artículo
        const removeButton = document.createElement('span');
        removeButton.textContent = '✖';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', function() {
            e.target.parentElement.removeChild(articleElement);
            e.target.parentElement.removeChild(removeButton);
            e.target.classList.remove('has-article');  // Permitir que se pueda arrastrar uno nuevo
        });
        
        // Estilo de la "X"
        removeButton.style.position = 'absolute';
        removeButton.style.top = '5px';
        removeButton.style.right = '5px';
        removeButton.style.cursor = 'pointer';
        removeButton.style.fontSize = '18px';
        removeButton.style.color = 'red';

        // Asegurarse que el contenedor es relativo para la posición de la "X"
        e.target.parentElement.style.position = 'relative';

        e.target.parentElement.appendChild(articleElement);  // Mover el artículo al contenedor de la imagen
        e.target.parentElement.appendChild(removeButton);    // Agregar la "X" para remover
        e.target.classList.add('has-article');  // Marca como ocupado
    }
}

// Verificar las respuestas
checkAnswersButton.addEventListener('click', () => {
    let correctAnswers = 0;
    dropzones.forEach(dropzone => {
        const container = dropzone.parentElement;
        const correctArticle = container.getAttribute('data-article');
        const droppedArticle = container.querySelector('.article');
        if (droppedArticle && droppedArticle.id === correctArticle) {
            correctAnswers++;
            dropzone.style.borderColor = 'green'; // Marcar correctos
        } else {
            dropzone.style.borderColor = 'red'; // Marcar incorrectos
        }
    });
    resultElement.textContent = `Respuestas correctas: ${correctAnswers} de ${dropzones.length}`;
    buttonsContainer.style.display = 'flex';  // Mostrar botones adicionales
});

// Función para volver a jugar (aleatorizar objetos)
playAgainButton.addEventListener('click', () => {
    resultElement.textContent = '';
    buttonsContainer.style.display = 'none';

    // Restaurar los bordes y vaciar los contenedores
    dropzones.forEach(dropzone => {
        dropzone.style.borderColor = 'black';
        const container = dropzone.parentElement;
        const droppedArticle = container.querySelector('.article');
        const removeButton = container.querySelector('.remove-btn');
        if (droppedArticle) {
            droppedArticle.remove();
        }
        if (removeButton) {
            removeButton.remove();
        }
        dropzone.classList.remove('has-article');  // Restaurar para permitir nuevos arrastres
    });

    // Aleatorizar la posición de los objetos
    const imageContainers = Array.from(document.querySelectorAll('.image-container'));
    const imagesParent = document.querySelector('.images');
    imageContainers.sort(() => Math.random() - 0.5); // Mezcla aleatoria
    imageContainers.forEach(container => {
        imagesParent.appendChild(container);  // Reordenar las imágenes
    });
});

// Función para volver al índice
goBackButton.addEventListener('click', () => {
    window.location.href = 'juemenu.html';  // Cambia esto a la página de inicio real
});
// Deshabilitar el desplazamiento en dispositivos móviles al arrastrar
document.addEventListener('touchmove', function(e) {
    if (e.target.classList.contains('word')) {
        e.preventDefault();  // Prevenir el desplazamiento al arrastrar palabras
    }
}, { passive: false });

