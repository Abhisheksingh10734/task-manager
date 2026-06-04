export const dashboardProtect = (req, res) => {
    res.status(200).json({
        message: "Authenticated user",
        user: req.user
    });
}