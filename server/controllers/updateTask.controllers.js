import db from "../db/index.js";

const updateTask = async (req, res) => {
    try {
        const { title, description, date, priority } = req.body;

        const priority_status = priority.toLowerCase();

        if (!title || !description || !date || !priority) {
            return res.status(400).json({
                message: "All fields are required."
            });
        };

        const taskID = Number(req.params.id);

        const updatedTask = await db.query("update tasks set title = $1, description = $2, due_date = $3, priority = $4 where id = $5", [title, description, date, priority_status, taskID]);

        return res.status(200).json({
            message: "Task updated successfully."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error."
        })
    }
};

export default updateTask;