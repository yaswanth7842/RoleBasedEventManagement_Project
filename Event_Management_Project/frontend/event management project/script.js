// script.js
const BASE_URL = "http://localhost:8085"; // <- make sure this matches the port your Spring Boot logs show

// Register
async function registerUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value.trim();
  const result = document.getElementById("result");

  result.style.color = "black";
  result.innerText = "Registering...";

  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email })
    });

    const text = await res.text();
    if (res.ok) {
      result.style.color = "green";
      result.innerText = "✅ " + (text || "Registered successfully");
      console.log("Register response:", text);
    } else {
      result.style.color = "red";
      result.innerText = "❌ Registration failed: " + (text || res.status);
      console.error("Register failed:", res.status, text);
    }
  } catch (err) {
    result.style.color = "orange";
    result.innerText = "⚠️ Error: " + err.message;
    console.error(err);
  }
}

// Login
async function loginUser() {
  const username = document.getElementById("loginUsername")?.value?.trim() || document.getElementById("username")?.value?.trim();
  const password = document.getElementById("loginPassword")?.value || document.getElementById("password")?.value;
  const result = document.getElementById("result");

  result.style.color = "black";
  result.innerText = "Logging in...";

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    // backend sometimes returns plain text "✅ Login successful. Your token: <token>"
    const text = await res.text();

    if (res.ok) {
      // try to extract token (handle both JSON { token: ... } and plain text)
      let token = null;
      try {
        const maybeJson = JSON.parse(text);
        if (maybeJson.token) token = maybeJson.token;
      } catch (e) { /* not JSON */ }

      if (!token) {
        // parse "Your token: <token>"
        const parts = text.split("Your token:");
        if (parts.length > 1) token = parts[1].trim();
        else {
          // maybe token only in body
          token = text.trim();
        }
      }

      if (!token) {
        result.style.color = "red";
        result.innerText = "❌ Login succeeded but token not found in response. Check backend response format.";
        console.error("Login OK but no token:", text);
        return;
      }

      localStorage.setItem("token", token);
      result.style.color = "green";
      result.innerText = "✅ Login successful!";
      console.log("Stored token:", token);

      // redirect to events page (if present)
      if (window.location.pathname.includes("login.html")) {
        window.location.href = "events.html";
      }
    } else {
      result.style.color = "red";
      result.innerText = "❌ Login failed: " + (text || res.status);
      console.error("Login failed:", res.status, text);
    }
  } catch (err) {
    result.style.color = "orange";
    result.innerText = "⚠️ Error: " + err.message;
    console.error(err);
  }
}

// Make functions global (in case of module mode)
window.registerUser = registerUser;
window.loginUser = loginUser;
