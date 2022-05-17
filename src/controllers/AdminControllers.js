class AdminControllers {
    // [GET] /api/admin/
    getAdminControllers(req, res) {
        return res.json({
            code: 0,
            message: 'Admin Controller',
        });
    }
}

module.exports = new AdminControllers();