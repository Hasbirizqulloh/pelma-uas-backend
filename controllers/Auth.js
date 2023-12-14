import User from '../models/UserModel.js';
import argon2 from 'argon2';

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ msg: 'Salah password woy' });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
  }
  const user = await User.findOne({
    attributes: ['uuid', 'name', 'email', 'role'],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: 'User tidak ditemukan' });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: 'Tidak dapat logout' });
    res.status(200).json({ msg: 'Anda telah logout' });
  });
};

export const SignUp = async (req, res) => {
  const { name, email, password, confPassword } = req.body;

  // Check if the password and confirm password match
  if (password !== confPassword) {
    return res.status(400).json({ msg: 'Password dan confirm tidak cocok' });
  }

  try {
    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email sudah terdaftar, gunakan email lain' });
    }

    // Hash the password before storing it in the database
    const hashPassword = await argon2.hash(password);

    // Create a new user in the database
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: 'user', // Set default role as 'user'
    });

    // Optionally, you might want to handle the response or return a success message
    res.status(201).json({ msg: 'Registrasi berhasil' });
  } catch (error) {
    res.status(500).json({ msg: 'Registrasi gagal', error: error.message });
  }
};
