const bcrypt = require('bcryptjs');
let users = require('../models/userModel'); // Import model pengguna

// Fungsi untuk menambahkan pengguna
const createUser = (req, res) => {
  const { name, username, password, role } = req.body;

  // Validasi input
  if (!name || !username || !password || !role) {
    return res.status(400).json({
      status: 'error',
      message: 'Semua data wajib diisi',
    });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Tambah pengguna baru
  const newUser = {
    id: users.length + 1,
    name,
    username,
    password: hashedPassword,
    role,
  };

  users.push(newUser); // Tambahkan pengguna baru ke array

  return res.status(201).json({
    status: 'success',
    message: 'Pengguna berhasil ditambahkan',
    data: newUser,
  });
};

// Fungsi untuk mendapatkan semua pengguna
const getAllUsers = (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Daftar pengguna berhasil diambil',
    data: users,
  });
};

// Fungsi untuk mendapatkan data pengguna berdasarkan ID
const getUser = (req, res) => {
  const { id } = req.params;

  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'Pengguna tidak ditemukan',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Pengguna ditemukan',
    data: user,
  });
};

// Fungsi untuk memperbarui pengguna
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, username, password, role } = req.body;

  // Cari pengguna berdasarkan ID
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'Pengguna tidak ditemukan',
    });
  }

  // Update data pengguna
  if (name) user.name = name;
  if (username) user.username = username;
  if (password) user.password = bcrypt.hashSync(password, 10); // Hash password baru
  if (role) user.role = role;

  return res.status(200).json({
    status: 'success',
    message: 'Pengguna berhasil diperbarui',
    data: user,
  });
};

// Fungsi untuk menghapus pengguna
const deleteUser = (req, res) => {
  const { id } = req.params;

  // Cari index pengguna berdasarkan ID
  const userIndex = users.findIndex((u) => u.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'Pengguna tidak ditemukan',
    });
  }

  // Hapus pengguna
  const deletedUser = users.splice(userIndex, 1)[0]; // Simpan data pengguna yang dihapus untuk referensi

  return res.status(200).json({
    status: 'success',
    message: 'Pengguna berhasil dihapus',
    data: deletedUser,
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
