import db from "../db/index.js";

const create = async (req, res) => {
    try {
        const { title, description, priority, date } = req.body;

        const priority_status = priority.toLowerCase();

        if (!title || !description || !priority || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { id } = req.user;

        const newTask = await db.query(
            `INSERT INTO tasks
            (title, description, due_date, priority, created_by)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [title, description, date, priority_status, id]
        );

        return res.status(201).json({
            message: "Task created successfully",
            task: newTask.rows[0]
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export default create;