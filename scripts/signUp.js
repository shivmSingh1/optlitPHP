document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');

    if (!form) {
        console.error("Signup form element not found!");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form data
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate input
        if (username.length < 6) {
            alert('Username must be at least 6 characters long.');
            return;
        }
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            alert('Please enter a valid email.');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        try {
            // Send data to the backend
            const response = await fetch('http://localhost/backend/server.php?action=signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            // Process the response
            const result = await response.text();

            if (response.ok) {
                alert('Signup successful! You can now login.');
                form.reset(); // Clear form fields
            } else {
                alert(`Error: ${result}`);
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
            console.error(error);
        }
    });
});
