document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');
    const clearCommentsButton = document.getElementById('clearComments');
    let comments = loadComments(); // Cargar comentarios almacenados (variable global ahora)

    displayComments(comments);

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const commentInput = document.getElementById('comment');

        if (commentInput.value.trim() === '') {
            alert('Por favor, ingresa tu comentario.');
            return;
        }

        const name = nameInput.value.trim() || 'Anónimo';
        const comment = commentInput.value.trim();

        const newComment = {
            name: name,
            comment: comment,
            date: new Date().toLocaleDateString()
        };

        comments.push(newComment);
        saveComments(comments);
        displayComments(comments);

        nameInput.value = '';
        commentInput.value = '';
    });

    function displayComments(comments) {
        commentsContainer.innerHTML = '';

        if (comments.length === 0) {
            commentsContainer.innerHTML = '<p>Aún no hay comentarios. ¡Sé el primero en comentar!</p>';
            return;
        }

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment-item');

            const nameHeading = document.createElement('h4');
            nameHeading.textContent = comment.name;

            const commentParagraph = document.createElement('p');
            commentParagraph.textContent = comment.comment;

            const dateParagraph = document.createElement('p');
            dateParagraph.classList.add('comment-date');
            dateParagraph.textContent = `Publicado el: ${comment.date}`;

            commentDiv.appendChild(nameHeading);
            commentDiv.appendChild(commentParagraph);
            commentDiv.appendChild(dateParagraph);

            commentsContainer.appendChild(commentDiv);
        });
    }

    function saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
        const storedComments = localStorage.getItem('comments');
        return storedComments ? JSON.parse(storedComments) : [];
    }

    clearCommentsButton.addEventListener('click', clearAllComments);

    function clearAllComments() {
        if (confirm('¿Estás seguro de que quieres borrar todos los comentarios?')) {
            comments = []; // Ahora sí modifica la variable global
            saveComments(comments);
            displayComments(comments);
        }
    }
});