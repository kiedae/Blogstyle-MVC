const handleLogin = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/'); // Redirect to the homepage on success
        } else {
          throw new Error('Login failed. Please check your credentials.'); // Display an error message
        }
      } catch (error) {
        alert(error.message); // Show an alert with the error message
      }
    }
  };
  
  const loginForm = document.querySelector('.login-form'); // Change the form class name
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin); // Updated event listener
  }