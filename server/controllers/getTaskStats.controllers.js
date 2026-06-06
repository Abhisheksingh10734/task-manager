import db from "../db/index.js";

const getTaskStats = async (req, res) => {
    try {
        const { id } = req.user;
        const userID = Number(id);

        const getName = await db.query("SELECT name FROM users WHERE id = $1", [userID]);
        const fullName = getName.rows[0];

        // ✅ filter by user
        const allTasks = await db.query(
            "SELECT * FROM tasks WHERE created_by = $1", [userID]
        );

        const stats = await db.query(`
            SELECT
                COUNT(CASE WHEN task_status = 'completed' THEN 1 END) AS completed_tasks,
                COUNT(CASE WHEN priority = 'high' THEN 1 END) AS high_priority_tasks,
                COUNT(CASE WHEN task_status = 'pending' THEN 1 END) AS pending_tasks
            FROM tasks
            WHERE created_by = $1
        `, [userID]);

        const tasks = allTasks.rows;

        const completedTasks = tasks.filter(task => task.task_status === "completed");
        const pendingTasks = tasks.filter(task => task.task_status === "pending");
        const highPriorityTasks = tasks.filter(task => task.priority === "high");
        const lowPriorityTasks = tasks.filter(task => task.priority === "low");

        return res.status(200).json({
            counts: {
                completedTasks: Number(stats.rows[0].completed_tasks),
                highPriorityTasks: Number(stats.rows[0].high_priority_tasks),
                pendingTasks: Number(stats.rows[0].pending_tasks)
            },
            tasks: {
                all: tasks,
                completed: completedTasks,
                pending: pendingTasks,
                highPriority: highPriorityTasks,
                lowPriority: lowPriorityTasks
            },
            username: { name: fullName.name }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default getTaskStats;