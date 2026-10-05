const USER_KEY = "group2User";
const LOGIN_KEY = "group2LoggedIn";

const loginForm = document.querySelector("#login-form");
const loginNameInput = document.querySelector("#login-name");
const loginPasswordInput = document.querySelector("#login-password");

const registerForm = document.querySelector("#register-form");
const registerNameInput = document.querySelector("#register-name");
const registerEmailInput = document.querySelector("#register-email");
const registerPasswordInput = document.querySelector("#register-password");

const messageElement = document.querySelector("#auth-message");

function showMessage(message, isError = false) {
  messageElement.textContent = message;

  if (isError) {
    messageElement.classList.add("error-message");
  } else {
    messageElement.classList.remove("error-message");
  }
}

async function hashPassword(password) {
  const passwordData = new TextEncoder().encode(password);
  const hashData = await crypto.subtle.digest("SHA-256", passwordData);
  const hashArray = Array.from(new Uint8Array(hashData));

  return hashArray
    .map(function (number) {
      return number.toString(16).padStart(2, "0");
    })
    .join("");
}

registerForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = registerNameInput.value.trim();
  const email = registerEmailInput.value.trim().toLowerCase();
  const password = registerPasswordInput.value;
  const passwordHash = await hashPassword(password);

  const user = {
    username: username,
    email: email,
    passwordHash: passwordHash,
    address: "",
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  registerForm.reset();
  loginNameInput.value = email;
  showMessage("Registration successful. You can now log in.");
  loginPasswordInput.focus();
});

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const savedUserText = localStorage.getItem(USER_KEY);

  if (savedUserText === null) {
    showMessage("Please register before logging in.", true);
    return;
  }

  const savedUser = JSON.parse(savedUserText);
  const enteredName = loginNameInput.value.trim().toLowerCase();
  const enteredPassword = loginPasswordInput.value;
  const enteredPasswordHash = await hashPassword(enteredPassword);

  const usernameMatches = savedUser.username.toLowerCase() === enteredName;
  const emailMatches = savedUser.email.toLowerCase() === enteredName;
  const passwordMatches = savedUser.passwordHash === enteredPasswordHash;

  if ((!usernameMatches && !emailMatches) || !passwordMatches) {
    showMessage("The username, email address, or password is incorrect.", true);
    return;
  }

  sessionStorage.setItem(LOGIN_KEY, "true");
  window.location.href = "profile.html";
});

const pageAddress = new URLSearchParams(window.location.search);

if (pageAddress.get("message") === "login-required") {
  showMessage("Please log in to view your profile.", true);
}