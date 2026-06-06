import db from "../db/index.js";

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;

    const deleteTaskID = Number(id);

    if(!id) {
        return res.status(404).json({message: "Requested task not found"});
    }

    const result = await db.query("delete from tasks where id = $1 RETURNING *", [deleteTaskID]);

    if(result.rowCount === 0) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Task deleted successfully."});
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"})
    }
}

export default deleteTask;