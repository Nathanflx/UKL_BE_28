const attendance = require('../models/attendanceModel');

// Fungsi untuk mencatat presensi
const recordAttendance = (req, res) => {
const { user_id, date, time, status } = req.body;

if (!user_id || !date || !time || !status) {
    return res.status(400).json({
    status: 'error',
    message: 'Semua data wajib diisi',
    });
}

const newAttendance = {
    attendance_id: attendance.length + 1,
    user_id,
    date,
    time,
    status,
};

attendance.push(newAttendance);

res.status(201).json({
    status: 'success',
    message: 'Presensi berhasil dicatat',
    data: newAttendance,
});
};

// Fungsi untuk mendapatkan riwayat presensi
const getAttendanceHistory = (req, res) => {
const { user_id } = req.params;

const userAttendance = attendance.filter((record) => record.user_id === parseInt(user_id));

if (userAttendance.length === 0) {
    return res.status(404).json({
    status: 'error',
    message: 'Riwayat presensi tidak ditemukan untuk pengguna ini',
    });
}

res.status(200).json({
    status: 'success',
    data: userAttendance,
});
};

// Rekap Kehadiran Bulanan
const getMonthlySummary = (req, res) => {
const { user_id } = req.params;
const { month, year } = req.query;

if (!month || !year) {
    return res.status(400).json({
    status: 'error',
    message: 'Bulan dan tahun wajib disediakan dalam query parameter',
    });
}

// Rekap Kehadiran Bulanan
const getMonthlySummary = (req, res) => {
    const { user_id } = req.params;
    const month = req.query.month ? parseInt(req.query.month) : new Date().getMonth() + 1; // Default ke bulan saat ini
    const year = req.query.year ? parseInt(req.query.year) : new Date().getFullYear(); // Default ke tahun saat ini

    const userAttendance = attendance.filter(
        (record) =>
            record.user_id === parseInt(user_id) &&
            new Date(record.date).getMonth() + 1 === month &&
            new Date(record.date).getFullYear() === year
    );

    if (userAttendance.length === 0) {
        return res.status(404).json({
            status: 'error',
            message: 'Tidak ada data presensi untuk pengguna ini pada periode tersebut',
        });
    }

    const summary = {
        hadir: userAttendance.filter((record) => record.status === 'hadir').length,
        izin: userAttendance.filter((record) => record.status === 'izin').length,
        sakit: userAttendance.filter((record) => record.status === 'sakit').length,
        total: userAttendance.length,
    };

    res.status(200).json({
        status: 'success',
        data: summary,
    });
};
    

const userAttendance = attendance.filter(
    (record) =>
    record.user_id === parseInt(user_id) &&
    new Date(record.date).getMonth() + 1 === parseInt(month) &&
    new Date(record.date).getFullYear() === parseInt(year)
);

if (userAttendance.length === 0) {
    return res.status(404).json({
    status: 'error',
    message: 'Tidak ada data presensi untuk pengguna ini pada periode tersebut',
    });
}

const summary = {
    hadir: userAttendance.filter((record) => record.status === 'hadir').length,
    izin: userAttendance.filter((record) => record.status === 'izin').length,
    sakit: userAttendance.filter((record) => record.status === 'sakit').length,
    total: userAttendance.length,
};

res.status(200).json({
    status: 'success',
    data: summary,
});
};

// Analisis Tingkat Kehadiran
const analyzeAttendance = (req, res) => {
const { start_date, end_date, group_by } = req.body;

if (!start_date || !end_date || !group_by) {
    return res.status(400).json({
    status: 'error',
    message: 'start_date, end_date, dan group_by wajib disediakan',
    });
}

const groupedAnalysis = {};

const filteredAttendance = attendance.filter((record) => {
    const recordDate = new Date(record.date);
    return recordDate >= new Date(start_date) && recordDate <= new Date(end_date);
});

filteredAttendance.forEach((record) => {
    const group = record[group_by];
    if (!groupedAnalysis[group]) {
    groupedAnalysis[group] = {
        total_users: 0,
        attendance_rate: {
        hadir: 0,
        izin: 0,
        sakit: 0,
        total: 0,
        },
    };
    }

    groupedAnalysis[group].attendance_rate[record.status]++;
    groupedAnalysis[group].attendance_rate.total++;
});

for (const group in groupedAnalysis) {
    const { hadir, izin, sakit, total } = groupedAnalysis[group].attendance_rate;
    groupedAnalysis[group].attendance_rate = {
    hadir_percentage: ((hadir / total) * 100).toFixed(2),
    izin_percentage: ((izin / total) * 100).toFixed(2),
    sakit_percentage: ((sakit / total) * 100).toFixed(2),
    total_percentage: 100,
    };
}

res.status(200).json({
    status: 'success',
    data: groupedAnalysis,
});
};

module.exports = {
recordAttendance,
getAttendanceHistory,
getMonthlySummary,
analyzeAttendance,
};