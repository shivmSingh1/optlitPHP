// import { shToast, danger } from "../modules/toast"

import { danger, shToast, success } from "../modules/toast";


const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const email = document.querySelector("#email").value.trim();
	const password = document.querySelector("#password").value.trim();

	if (!email || !password) {
		shToast("Email and password are required.", danger);
		return;
	}

	try {
		const response = await fetch('http://localhost/backend/server.php?action=login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		const result = await response.json();

		if (result.success) {
			localStorage.setItem("userName", result.name);
			loginForm.reset();
			window.location.href = "http://localhost:5173/index.html?toast=login-success";
		} else {
			shToast(result.message, danger);
		}
	} catch (error) {
		shToast("An error occurred. Please try again later.", danger);
		console.error(error);
	}
});
