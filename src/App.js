import React, { useState, useEffect } from "react";


function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  useEffect(() => {
  const data = JSON.parse(localStorage.getItem("todos")) || [];
  setTasks(data);
}, []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(tasks));
}, [tasks]);

  // Load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (inputValue.trim() === "") return;

    if (editId) {
      // ✏️ UPDATE task
      setTasks(
        tasks.map((t) =>
          t.id === editId ? { ...t, text: inputValue } : t
        )
      );
      setEditId(null);
    } else {
      // ➕ ADD task
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setInputValue("");
  };

  const handleEdit = (task) => {
    setInputValue(task.text);
    setEditId(task.id);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 🔍 Filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // 📊 Derived Data
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;


  const buttonStyle = {
  padding: "6px 12px",
  margin: "5px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};
    
  return (
    <div
    style={{
      maxWidth: "500px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      backgroundColor: "#f9f9f9",
      textAlign: "center",
      fontFamily: "Arial"
    }}
    >
      <h1>Todo App</h1>

      {/* Input */}
      <div style={{ marginBottom: "15px" }}>
        <input
  type="text"
  placeholder="Enter task"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleAdd();
  }}
   style={{ padding: "8px", width: "70%" }}
/>
        <button
          onClick={handleAdd}
  disabled={!inputValue.trim()}
          style={{ padding: "8px", marginLeft: "5px" }}
        >
          {editId ? "Update" : "Add"}
        </button>
        {!inputValue.trim() && (
    <p style={{ color: "red", marginTop: "5px" }}>
      Enter a task
    </p>)}
      </div>

      {/* Filters */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {/* 📊 Task Count */}
      <p>
        Total: {totalTasks} | Completed: {completedTasks}
      </p>

      {/* 🧾 Task List */}
      {filteredTasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTasks.map((task) => (
            <li key={task.id} style={{ margin: "10px 0" }}>
              <span
                onClick={() => toggleComplete(task.id)}
                style={{
                  textDecoration: task.completed
                    ? "line-through"
                    : "none",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                {task.text}
              </span>

              <button onClick={() => handleEdit(task)}>✏️</button>
              <button onClick={() => handleDelete(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
