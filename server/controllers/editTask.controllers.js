import db from "../db/index.js";

const editTask = async (req, res) => {
    const {id} = req.params;

    if(!id) {
        return res.status(500).json({
            message: "Task not found."
        });
    }

    const taskId = Number(id);

    const task = await db.query("select id, title, description, priority, due_date from tasks where id = $1", [taskId]);

    return res.status(200).json({
        task: task.rows[0]
    })
    
    
}

export default editTask;