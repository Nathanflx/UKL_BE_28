const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const users = require('../models/userModel');

    const login = (req, res) => {
    const { username, password } = req.body;

    // Debugging: log request body
    console.log('Request Body:', req.body);

    // Validasi input
    if (!username || !password) {
        return res.status(400).json({
        status: 'error',
        message: 'Username dan password wajib diisi',
        });
    }

    // Cari pengguna
    const user = users.find((u) => u.username === username);
    if (!user) {
        return res.status(404).json({
        status: 'error',
        message: 'Pengguna tidak ditemukan',
        });
    }

    // Verifikasi password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
        status: 'error',
        message: 'Password salah',
        });
    }

    // Buat token JWT
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
        status: 'success',
        message: 'Login berhasil',
        token,
    });
    };

    module.exports = { login };