const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users'); // Pastikan path benar
const attendanceRoutes = require('./routes/attendance'); // Pastikan path sudah benar


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Tambahkan rute pengguna

// Rute
app.use('/api/attendance', attendanceRoutes); // Pastikan rute ini terdaftar

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});