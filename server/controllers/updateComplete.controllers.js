import db from "../db/index.js";

const updateComplete = async (req, res) => {
    try {
        const { id } = req.params;

        const taskID = Number(id);

        const result = await db.query("update tasks set task_status = 'completed' where id = $1", [taskID]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task completed successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

}

export default updateComplete;