module.exports = (req, res, next) => {
    const { role } = req.user;

    console.log(req.user);

    if (role !== 'admin') {
        return res.status(401).json({
            code: 101,
            message: 'Người dùng không phải quản trị viên'
        })
    }

    next();
}