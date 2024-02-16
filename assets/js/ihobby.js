document.addEventListener('DOMContentLoaded', function () {
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');
  var resetPasswordForm = document.getElementById('resetPasswordForm');
  var goToRegisterLink = document.getElementById('goToRegister');
  var goToLoginLink = document.getElementById('goToLogin');
  var forgotPasswordLink = document.getElementById('forgotPasswordLink');

  function showLoginForm() {
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
    resetPasswordForm.style.display = 'none';
  }

  function showRegisterForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'flex';
    resetPasswordForm.style.display = 'none';
  }

  function showResetPasswordForm() {
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    resetPasswordForm.style.display = 'flex';
  }

  if (goToRegisterLink) {
    goToRegisterLink.addEventListener('click', function (event) {
      event.preventDefault();
      showRegisterForm();
    });
  }

  if (goToLoginLink) {
    goToLoginLink.addEventListener('click', function (event) {
      event.preventDefault();
      showLoginForm();
    });
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function (event) {
      event.preventDefault();
      showResetPasswordForm();
    });
  }

  showLoginForm();

  function validateLogin() {
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
  
    var emailValue = emailInput.value.trim();
    var passwordValue = passwordInput.value.trim();
  
    if (emailValue === '' || passwordValue === '') {
      alert('Email and password are required.');
      return;
    }
  
    // Giriş bilgilerini kontrol et
    if (emailValue === 'ornek@email.com' && passwordValue === '123456') {
      alert('Login successful! Redirecting to home page.');
      window.location.href = './home.html'; // Doğru ise home.html sayfasına yönlendir
    } else {
      alert('Invalid email or password. Please try again.');
    }
  }
  

  document.getElementById('log').addEventListener('click', function () {
    validateLogin();
  });
  document.getElementById('log').addEventListener('click', function () {
    validateLogin();
  });
  
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  function forgotPassword() {
    var loginForm = document.getElementById('loginForm');
    var resetPasswordForm = document.getElementById('resetPasswordForm');

    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    resetPasswordForm.style.display = 'flex';
  }

  function registerAccount() {
    var registerEmailInput = document.getElementById('registerEmail');
    var registerPasswordInput = document.getElementById('registerPassword');

    var registerEmailValue = registerEmailInput.value.trim();
    var registerPasswordValue = registerPasswordInput.value.trim();

    if (registerEmailValue === '' || registerPasswordValue === '') {
      alert('Email and password are required for registration.');
      return;
    }

    if (!isValidEmail(registerEmailValue)) {
      alert('Invalid email address. Please enter a valid email address for registration.');
      return;
    }

    if (!isValidPassword(registerPasswordValue)) {
      alert('Invalid password. Password must be at least 8 characters long and include at least one letter and one number for registration.');
      return;
    }

    alert('Registration successful!');
  }

  // Şifre sıfırlama işlemi için basit bir uyarı fonksiyonu
  function resetPassword() {
    var resetEmailInput = document.getElementById('resetEmail');
    var resetEmailValue = resetEmailInput.value.trim();

    if (resetEmailValue === '') {
      alert('Please enter your email address to reset your password.');
      return;
    }

    alert('A password reset link has been sent to your email address.');
  }
});
