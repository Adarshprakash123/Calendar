const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const firebaseAdmin = require('firebase-admin');
const eventRoutes = require('./routes/eventRoutes');
require('dotenv').config();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require('./firebaseServiceAccountKey.json'))
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));
