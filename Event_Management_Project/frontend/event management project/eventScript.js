// eventScript.js
const BASE_URL = "http://localhost:8085"; // << verify port

async function addEvent() {
  const eventName = document.getElementById("eventName").value.trim();
  const location = document.getElementById("location").value.trim();
  const date = document.getElementById("date").value.trim();
  const description = document.getElementById("description").value.trim();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
    return;
  }

  const payload = { eventName, location, date, description };

  try {
    const res = await fetch(`${BASE_URL}/events/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    if (res.ok) {
      alert("✅ Event created successfully!");
      clearEventForm();
      loadEvents();
    } else {
      alert("❌ Failed to create event: " + (text || res.status));
      console.error("Create event failed:", res.status, text);
    }
  } catch (err) {
    alert("⚠️ Error: " + err.message);
    console.error(err);
  }
}

function clearEventForm() {
  ["eventName", "location", "date", "description"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

async function loadEvents() {
  const eventsList = document.getElementById("eventsList");
  eventsList.innerHTML = "Loading events...";

  const token = localStorage.getItem("token") || "";

  try {
    // If token exists, include header; backend allows public /events/all for exploration depending on config
    const res = await fetch(`${BASE_URL}/events/all`, {
      headers: token ? { "Authorization": `Bearer ${token}` } : {}
    });

    if (!res.ok) {
      const txt = await res.text();
      eventsList.innerHTML = "❌ Failed to load events: " + (txt || res.status);
      console.error("Load events failed:", res.status, txt);
      return;
    }

    const events = await res.json();
    if (!Array.isArray(events)) {
      eventsList.innerHTML = "No events found.";
      return;
    }

    if (events.length === 0) {
      eventsList.innerHTML = "<p>No events available.</p>";
      return;
    }

    eventsList.innerHTML = "";
    events.forEach(e => {
      const div = document.createElement("div");
      div.className = "event-item";
      div.innerHTML = `
        <h3>${escapeHtml(e.eventName || "")}</h3>
        <p><strong>Location:</strong> ${escapeHtml(e.location || "")}</p>
        <p><strong>Date:</strong> ${escapeHtml(e.date || "")}</p>
        <p>${escapeHtml(e.description || "")}</p>
        ${e.id ? `<button onclick="deleteEvent(${e.id})">🗑 Delete</button>` : ""}
      `;
      eventsList.appendChild(div);
    });
  } catch (err) {
    eventsList.innerHTML = "⚠️ Error: " + err.message;
    console.error(err);
  }
}

async function deleteEvent(id) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Login required.");
    return;
  }
  if (!confirm("Delete this event?")) return;

  try {
    const res = await fetch(`${BASE_URL}/events/delete/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (res.ok) {
      alert("🗑 Event deleted");
      loadEvents();
    } else {
      const t = await res.text();
      alert("❌ Delete failed: " + (t || res.status));
      console.error("Delete failed:", res.status, t);
    }
  } catch (err) {
    alert("⚠️ Error: " + err.message);
    console.error(err);
  }
}

function escapeHtml(s) {
  if (!s) return "";
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

// Auto load on page open
window.addEventListener("load", () => {
  window.addEventListener("focus", loadEvents); // reload when coming back to tab
  loadEvents();
});

// expose global functions used in html onclick
window.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", loadEvents);
  window.addEventListener("load", clearEventForm);
});
window.addEventListener("load", () => {
  window.addEventListener("click", () => {});
});
window.addEventListener("load", () => {
  window.addEventListener("keydown", () => {});
});

window.addEventListener("load", () => {
  window.deleteEvent = deleteEvent;
  window.addEvent = addEvent;
  window.loadEvents = loadEvents;
});
