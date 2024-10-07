import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaPencilAlt, FaAngleRight, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskManager = () => {
    const [data, setData] = useState("");
    const [saveData, setSaveData] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    const handleAddTask = async () => {
        const uri = "http://localhost:5000/api/tasks/createTask";
        const obj = {
            taskName: data,
            isDone: false,
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        };

        try {
            const result = await fetch(uri, options);
            const responseData = await result.json();

            if (responseData.success) {
                toast.success(responseData.msg);
                setData(""); // Clear input field
                getAllTask(); // Refresh the task list
            } else {
                toast.error("Failed to add task.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the task.");
            console.error("Error adding task:", error);
        }
    };

    const getAllTask = async () => {
        const uri = "http://localhost:5000/api/tasks/getTask";
        try {
            const response = await fetch(uri);
            const result = await response.json();
            setSaveData(result.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleEditTask = (task) => {
        setData(task.taskName);
        setEditingTask(task);
    };

    const handleUpdateTask = async () => {
        if (!editingTask) return;
        const uri = `http://localhost:5000/api/tasks/updateTask/${editingTask._id}`;
        const obj = {
            taskName: data,
            isDone: editingTask.isDone,
        };

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        };

        try {
            const res = await fetch(uri, options);
            const result = await res.json();

            if (result.success) {
                toast.success(result.msg);
                setData(""); 
                setEditingTask(null); 
                getAllTask(); 
            } else {
                toast.error("Failed to update task.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the task.");
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (id) => {
        const uri = `http://localhost:5000/api/tasks/deleteTask/${id}`;
        const options = {
            method: "DELETE",
        };
        
        try {
            const response = await fetch(uri, options);
            const result = await response.json(); // Use await here
            if (result.success) {
                toast.success(result.msg);
                getAllTask(); // Refresh the task list
            } else {
                toast.error("Failed to delete task.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting the task.");
            console.error("Error deleting task:", error);
        }
    };

   
    const handleToggleTask = async (task) => {
        const uri = `http://localhost:5000/api/tasks/updateTask/${task._id}`;
        const updatedTask = {
            ...task,
            isDone: !task.isDone, 
        };

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask), 
        };

        try {
            const response = await fetch(uri, options);
            const result = await response.json();

            if (result.success) {
                toast.success(result.msg);
                getAllTask(); 
            } else {
                toast.error("Failed to update task.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the task.");
            console.error("Error updating task:", error);
        }
    };

    useEffect(() => {
        getAllTask();
    }, []);

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-center mt-5">
                <h1 className="mb-5">Task Manager App</h1>

                <div className="row w-100 mb-4">
                    <div className="col-12 col-md-8">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                placeholder="Add a new task"
                            />
                            <button
                                className="btn btn-success"
                                onClick={editingTask ? handleUpdateTask : handleAddTask}
                            >
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaSearch />
                            </span>
                            <input type="text" className="form-control" placeholder="Search tasks" />
                        </div>
                    </div>
                </div>

                {/* Display Tasks */}
                {saveData.length > 0 ? (
                    saveData.map((item, index) => (
                        <div key={index} className="border bg-light rounded-3 w-100 p-2 mb-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <span className={item.isDone ? "text-decoration-line-through" : ""}>
                                        {item.taskName}
                                    </span>
                                </div>
                                <div>
                                    <button className="btn btn-success me-2" onClick={() => handleToggleTask(item)}>
                                        <FaAngleRight />
                                    </button>
                                    <button className="btn btn-primary me-2" onClick={() => handleEditTask(item)}>
                                        <FaPencilAlt />
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteTask(item._id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tasks available.</p>
                )}
                <ToastContainer />
            </div>
        </div>
    );
};

export default TaskManager;
