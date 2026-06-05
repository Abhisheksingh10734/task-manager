import db from "../db/index.js";

const getTasks = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { id } = req.user;

        const allUserTasks = await db.query("select * from tasks where created_by = $1", [id]);

        return res.status(201).json({
            allTasks: allUserTasks.rows,
            totalTaskCount: allUserTasks.rowCount,
            message: "Tasks fetched successfully."
        });
        
    } catch (error) {
        
    }
    
}

export default getTasks;