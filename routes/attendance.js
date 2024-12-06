const express = require('express');
const { 
    getMonthlySummary, 
    analyzeAttendance, 
    recordAttendance, 
    getAttendanceHistory 
} = require('../controllers/attendanceController');

const router = express.Router();

// Rute untuk mencatat presensi
router.post('/', recordAttendance);

// Rute untuk mendapatkan riwayat presensi
router.get('/history/:user_id', getAttendanceHistory);

// Rute untuk rekap kehadiran bulanan
router.get('/summary/:user_id', getMonthlySummary);

// Rute untuk analisis tingkat kehadiran
router.post('/analysis', analyzeAttendance);

module.exports = router;
