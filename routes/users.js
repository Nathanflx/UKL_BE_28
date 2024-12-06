const express = require('express'); 
const {
  createUser,
  getAllUsers,
  getUser, // Perbaiki penggunaan fungsi ini
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Tambah pengguna
router.post('/', createUser);

// Ambil semua pengguna
router.get('/', getAllUsers);

// Ambil pengguna berdasarkan ID
router.get('/:id', getUser); // Tambahkan rute ini

// Perbarui pengguna
router.put('/:id', updateUser);

// Hapus pengguna
router.delete('/:id', deleteUser);

module.exports = router;
