document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        // Traitez la réponse de l'API, par exemple en affichant un message de réussite
        document.getElementById('message').textContent = 'Login successful';
    })
    .catch(error => {
        // Gérez les erreurs, par exemple en affichant un message d'erreur
        console.error(error);
        document.getElementById('message').textContent = 'Login failed';
    });
});

/*document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        return response.json();
    })
    .then(data => {
        // Traitez la réponse de l'API, par exemple en affichant un message de réussite
        document.getElementById('message').textContent = 'User registered successfully';
    })
    .catch(error => {
        // Gérez les erreurs, par exemple en affichant un message d'erreur
        console.error(error);
        document.getElementById('message').textContent = 'Registration failed';
    });
});*/

