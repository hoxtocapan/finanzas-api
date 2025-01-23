const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Aquí puedes usar variables de entorno, por ejemplo:
const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto'; // ¡No dejes esto en producción!

// Registro
async function register(req, res) {
  try {
    const { email, password, name } = req.body;

    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name
    });

    return res.status(201).json({ 
      message: 'Usuario registrado con éxito', 
      userId: newUser.id 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
}

// Login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Verificar existencia de usuario
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Usuario/contraseña incorrectos' });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario/contraseña incorrectos' });
    }

    // Crear token con JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login exitoso',
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
}

module.exports = {
  register,
  login
};
