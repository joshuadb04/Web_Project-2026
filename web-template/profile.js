const USER_KEY = "group2User";
const LOGIN_KEY = "group2LoggedIn";

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

function startProfilePage() {
  const isLoggedIn = sessionStorage.getItem(LOGIN_KEY) === "true";
  const savedUserText = localStorage.getItem(USER_KEY);

  if (!isLoggedIn || savedUserText === null) {
    sessionStorage.removeItem(LOGIN_KEY);
    window.location.replace("login-register.html?message=login-required");
    return;
  }

  const savedUser = JSON.parse(savedUserText);

  const profileForm = document.querySelector("#profile-form");
  const usernameInput = document.querySelector("#profile-name");
  const emailInput = document.querySelector("#profile-email");
  const addressInput = document.querySelector("#profile-address");

  const currentPasswordInput = document.querySelector("#current-password");
  const newPasswordInput = document.querySelector("#new-password");
  const confirmPasswordInput = document.querySelector("#confirm-password");

  const profileInitial = document.querySelector("#profile-initial");
  const messageElement = document.querySelector("#profile-message");
  const editButton = document.querySelector("#edit-button");
  const saveButton = document.querySelector("#save-button");
  const cancelButton = document.querySelector("#cancel-button");
  const logoutButton = document.querySelector("#logout-button");

  function showMessage(message, isError = false) {
    messageElement.textContent = message;

    if (isError) {
      messageElement.classList.add("error-message");
    } else {
      messageElement.classList.remove("error-message");
    }
  }

  function displayUserInformation() {
    usernameInput.value = savedUser.username;
    emailInput.value = savedUser.email;
    addressInput.value = savedUser.address || "";
    profileInitial.textContent = savedUser.username.charAt(0).toUpperCase();
  }

  function clearPasswordInputs() {
    currentPasswordInput.value = "";
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";
  }

  function setEditing(isEditing) {
    usernameInput.disabled = !isEditing;
    emailInput.disabled = !isEditing;
    addressInput.disabled = !isEditing;
    currentPasswordInput.disabled = !isEditing;
    newPasswordInput.disabled = !isEditing;
    confirmPasswordInput.disabled = !isEditing;

    editButton.hidden = isEditing;
    saveButton.hidden = !isEditing;
    cancelButton.hidden = !isEditing;

    if (isEditing) {
      usernameInput.focus();
    }
  }

  editButton.addEventListener("click", function () {
    showMessage("");
    setEditing(true);
  });

  cancelButton.addEventListener("click", function () {
    displayUserInformation();
    clearPasswordInputs();
    setEditing(false);
    showMessage("");
  });

  profileForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const address = addressInput.value.trim();

    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmedPassword = confirmPasswordInput.value;

    const wantsToChangePassword =
      currentPassword !== "" || newPassword !== "" || confirmedPassword !== "";

    if (wantsToChangePassword) {
      const currentPasswordHash = await hashPassword(currentPassword);

      if (currentPasswordHash !== savedUser.passwordHash) {
        showMessage("The current password is incorrect.", true);
        return;
      }

      if (newPassword.length < 6) {
        showMessage("The new password must contain at least 6 characters.", true);
        return;
      }

      if (newPassword !== confirmedPassword) {
        showMessage("The new passwords do not match.", true);
        return;
      }

      savedUser.passwordHash = await hashPassword(newPassword);
    }

    savedUser.username = username;
    savedUser.email = email;
    savedUser.address = address;

    localStorage.setItem(USER_KEY, JSON.stringify(savedUser));

    displayUserInformation();
    clearPasswordInputs();
    setEditing(false);

    if (wantsToChangePassword) {
      showMessage("Your profile and password were updated.");
    } else {
      showMessage("Your profile was updated.");
    }
  });

  logoutButton.addEventListener("click", function () {
    sessionStorage.removeItem(LOGIN_KEY);
    window.location.href = "login-register.html";
  });

  displayUserInformation();
}

startProfilePage();