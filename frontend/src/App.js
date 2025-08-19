import React, { useEffect, useState } from "react";
import api from "./api";
import TaskList from "./components/taskList/taskList";
import EditTaskModal from "./components/editModal/EditTaskModal";
import { FaPlus } from "react-icons/fa";
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const loadTasks = async () => {
    try {
      const res = await api.get("/");
      setTasks(res.data);
    } catch (err) {
      console.error("Erro ao carregar tarefas", err);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await api.post("/create", { title: newTask, description: newDescription, completed: false });
      setTasks((prev) => [...prev, res.data]);
      setNewTask("");
      setNewDescription("");
    } catch (err) {
      console.error("Erro ao adicionar tarefa", err);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await api.put(`/${id}`, updates);
      setTasks((prev) => prev.map((task) => (task.id === id ? res.data : task)));
    } catch (err) {
      console.error("Erro ao atualizar tarefa", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Erro ao excluir tarefa", err);
    }
  };

  const toggleTask = async (id) => {
    try {
      await api.patch(`/${id}/completed`);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar tarefa", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsEditing(true);
  };

  const handleSave = async (updates) => {
    if (!taskToEdit) return;
    await updateTask(taskToEdit.id, updates);
    setTaskToEdit(null);
  };

  return (
    <div className="app">
      <h1>Todo List</h1>

      <input
        type="text"
        placeholder="Pesquisar tarefa..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="add-task">
        <input
          type="text"
          placeholder="Nova tarefa..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={addTask}>
          <FaPlus /> Adicionar
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onUpdate={handleEditClick}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
      {isEditing && taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}

export default App;
