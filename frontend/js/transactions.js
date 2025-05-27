// >>> adjust this if you mapped the container differently
const API_BASE = "http://localhost:5001/api/transactions";

const tbody   = document.querySelector("#txTable tbody");
const form    = document.getElementById("txForm");
const flashEl = document.getElementById("flash");

// ---------- Helpers
function money(x) {
  return Number(x).toFixed(2);
}
function flash(msg, type = "success") {
  flashEl.className = `alert alert-${type}`;
  flashEl.textContent = msg;
  flashEl.classList.remove("d-none");
  setTimeout(() => flashEl.classList.add("d-none"), 2500);
}

// ---------- CRUD calls
async function loadTransactions() {
  const res  = await fetch(API_BASE, { credentials: "include" });
  const list = await res.json();
  tbody.innerHTML = "";
  list.forEach(tx => addRow(tx));
}

async function addTransaction(payload) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Save failed");
}

// ---------- DOM rendering
function addRow(tx) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${tx.type}</td>
    <td>${tx.category}</td>
    <td class="text-end">${money(tx.amount)}</td>
    <td>${tx.date?.slice(0, 10)}</td>
  `;
  tbody.appendChild(tr);
}

// ---------- Form handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const payload = {
    type:     form.type.value,
    category: form.category.value.trim(),
    amount:   parseFloat(form.amount.value),
    date:     form.date.value,
  };

  try {
    await addTransaction(payload);
    flash("Transaction added ✅");
    form.reset();
    await loadTransactions();
  } catch (err) {
    flash("Error while saving ❌", "danger");
    console.error(err);
  }
});

// ---------- Init
document.addEventListener("DOMContentLoaded", () => {
  // default date = today
  form.date.valueAsDate = new Date();
  loadTransactions();
});

const current = location.pathname.split('/').pop();

document.querySelectorAll('.nav-link[data-page]').forEach(link => {
if (link.dataset.page === current) {
    // remove blue-on-white classes, add white-on-blue
    link.classList.remove('bg-primary', 'text-white');
    link.classList.add('bg-white', 'text-dark', 'border');
}
});