import React from "react";
import PropTypes from "prop-types";
import TaskItem from "../taskItem/taskItem";
import "./taskList.css";

const TaskList = ({ tasks, onDelete, onToggle, onUpdate }) => {
    if (tasks.length === 0) {
        return <p className="empty">Nenhuma tarefa encontrada.</p>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default TaskList;
