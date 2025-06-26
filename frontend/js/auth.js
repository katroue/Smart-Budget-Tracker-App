// Adjust if backend is on a different host/port
const API = "http://localhost:5002/api/auth"; //error here

const flash   = document.getElementById("flash");
const regForm = document.getElementById("registerForm");
const logForm = document.getElementById("loginForm");

function showFlash(msg, type = "success") {
  flash.textContent = msg;
  flash.className   = `alert alert-${type}`;
  flash.classList.remove("d-none");
  setTimeout(() => flash.classList.add("d-none"), 2500);
}

// ---- Register ----
regForm?.addEventListener("submit", async e => {
  e.preventDefault();
  const body = Object.fromEntries(new FormData(regForm));

  try {
    const r = await fetch(`${API}/register`, {
      method : "POST",
      headers: { "Content-Type":"application/json" },
      body   : JSON.stringify(body)
    });
    if (r.status === 201) {
      showFlash("Account created ✅");
      regForm.reset();
    } else if (r.status === 409) {
      showFlash("Username already taken", "danger");
    } else {
      showFlash("Error creating user", "danger");
    }
  } catch (err) {
    console.error(err);
    showFlash("Network error", "danger");
  }
});

// ---- Login ----
logForm?.addEventListener("submit", async e => {
  e.preventDefault();
  const body = Object.fromEntries(new FormData(logForm));

  try {
    const r = await fetch(`${API}/login`, {
      method : "POST",
      headers: { "Content-Type":"application/json" },
      body   : JSON.stringify(body)
    });
    if (r.ok) { // r != ok
      const { token } = await r.json(); 
      localStorage.setItem("jwt", token);     
      showFlash("Logged in! Redirecting…");
      setTimeout(() => (location.href = "transactions.html"), 800);
    } else {
      showFlash("Invalid credentials", "danger"); // what i get when i try to login
    }
  } catch (err) {
    console.error(err);
    showFlash("Network error", "danger");
  }
});
