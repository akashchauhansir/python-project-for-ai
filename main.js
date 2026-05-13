async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return;

  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  const task = await response.json();

  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.id = task.id;
  li.innerHTML = `
    <span onclick="toggleTask(${task.id}, this.parentElement)">${task.title}</span>
    <span class="badge">⏳</span>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

async function toggleTask(id, element) {
  const response = await fetch(`/api/tasks/${id}`, { method: "PATCH" });
  const task = await response.json();

  const badge = element.querySelector(".badge");
  if (task.done) {
    element.classList.add("done");
    badge.textContent = "✅";
  } else {
    element.classList.remove("done");
    badge.textContent = "⏳";
  }
}

// Allow pressing Enter to add a task
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("taskInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });
});
