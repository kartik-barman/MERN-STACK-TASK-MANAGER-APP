const TaskModel = require('../model/TaskModel');



/**
 *  Task Crate Api
 * http://localhost:5000/createTask
 */
const createTaskApi = async (req, res)=> {
    const data = req.body;
    try {
        const newData = new TaskModel(data);
        await newData.save();
        res.status(200).json({success : true, msg : "Task created successfully"});
    } catch (error) {
        console.error("Error : ", error);
        res.status(500).json({success : false, msg : "internal server error"});
    }
}

// Get All Task APi
// http://localhost:5000/getTask
const getAllTaskApi = async (req, res)=>{
    try {
        const data = await TaskModel.find();
        res.status(200).json({success : true, msg : "Successfully get all task", data});
    } catch (error) {
        console.error("Error : ", error);
        res.status(500).json({msg : "internal server error"});
    }
}

// Update Task Api 
// http://localhost:5000/updateTask/:6703afb1dc913d54fc23f472

const updateTaskApi = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updatedTask = await TaskModel.findByIdAndUpdate(id, { $set: body }, { new: true });
        res.status(200).json({success : true, msg : "Task Updated Successfully..", updatedTask})
    } catch (error) {
        console.error("Error : " , error);
        res.status(500).json({success : false, msg : "Internal server error"});
    }
}


// Delete Task APi
// http://localhost:5000/api/tasks/deleteTask

const deleteTaskApi = async (req, res)=> {
    try {
        const id = req.params.id;
        const deletedTask = await TaskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ success: false, msg: 'Task not found' });
        }
        res.json({ success: true, msg: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
    res.status(500).json({ success: false, msg: 'Internal Server error' });
    }
}

module.exports = {
    createTaskApi,
    getAllTaskApi,
    updateTaskApi,
    deleteTaskApi
}