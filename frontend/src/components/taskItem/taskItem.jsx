import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";
import "./taskItem.css";

const TaskItem = ({ task, onDelete, onToggle, onUpdate }) => {
    return (
        <div className="task-item">
            <span
                className={clsx("task-text", { completed: task.completed })}
            >
                {task.title}
            </span>
            {task.description && (
                <p
                    className={clsx("task-description", {
                        completed: task.completed,
                    })}
                >
                    {task.description}
                </p>
            )}
            <div className="task-actions">
                <button
                    className="btn-done"
                    onClick={() => onToggle(task.id)}
                    title="Marcar como feito"
                >
                    <FaCheck />
                </button>
                <button
                    className="btn-update"
                    onClick={() => onUpdate(task)}
                    title="Editar tarefa"
                >
                    <FaEdit />
                </button>
                <button
                    className="btn-delete"
                    onClick={() => onDelete(task.id)}
                    title="Excluir"
                >
                    <FaTrash />
                </button>

            </div>
        </div>
    )
}

TaskItem.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default TaskItem;