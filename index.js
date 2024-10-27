const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());


app.use(express.json()); // Parses incoming JSON requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);


mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.post('/users/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


  