const todoModel = require("../models/todoModels");

async function getAllTodos(req, res) {
    try {
        const todos = await todoModel.findAll();
        return res.status(200).json(todos);
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        return res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
}

async function searchTodos(req, res) {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: "Parâmetro de busca 'q' é obrigatório" });
        }

        const todos = await todoModel.searchByTitle(q);
        return res.status(200).json(todos);
    } catch (error) {
        console.error("Erro ao pesquisar tarefas", error);
        return res.status(500).json({ error: "Erro ao pesquisar tarefas" });
    }
}

async function createTodo(req, res) {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ error: "O campo 'Nome' é obrigatório" });
        }

        const newTodo = await todoModel.create({
            title,
            description: description || "",
        });

        return res.status(201).json(newTodo);
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        return res.status(500).json({ error: "Erro ao criar tarefa" });
    }
}

async function updateTodo(req, res) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID é obrigatório" });
        }

        await todoModel.update(id, { title, description });
        return res.status(200).json({ message: "Tarefa atualizada com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        return res.status(500).json({ error: "Erro ao atualizar tarefa" });
    }
}

async function deleteTodo(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID é obrigatório" });
        }

        await todoModel.remove(id);
        return res.status(200).json({ message: "Tarefa removida com sucesso" });
    } catch (error) {
        console.error("Erro ao remover todo:", error);
        return res.status(500).json({ error: "Erro ao remover tarefa" });
    }
}

async function markAsCompleted(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "ID é obrigatório" });

        const updatedTodo = await todoModel.update(id, { completed: true });

        return res.status(200).json({
            message: "Tarefa concluida com sucesso",
            updateTodo
        })
    } catch {
        console.error("Erro ao marcar tarefa como concluída:", error);
        return res.status(500).json({ error: "Erro ao atualizar tarefa." });
    }
}

module.exports = {
    getAllTodos,
    searchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    markAsCompleted
};