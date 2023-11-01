// Logout the user and redirect to the homepage
const logoutUser = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/'); 
      } else {
        throw new Error('Failed to log out.'); 
      }
    } catch (error) {
      alert(error.message); 
    }
  };
  
  const logoutButton = document.querySelector('#logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
  }