document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://65cd3ef3dd519126b840498d.mockapi.io/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Registration successful!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed!');
    });
});
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('https://65cd3ef3dd519126b840498d.mockapi.io/login')
    .then(response => response.json())
    .then(data => {
        const user = data.find(user => user.email === email && user.password === password);
        if (data.some(user => user.email === email && user.password === password)) {
            alert('Login successful!');
            window.location.href = 'home.html';
        } else {
            alert('Login failed! Invalid email or password.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed!');
    });
});
document.getElementById('register-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-link').style.display = 'block';
    document.getElementById('register-link').style.display = 'none';
});

document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('register-link').style.display = 'block';
});

