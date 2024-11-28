require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const activityRoutes = require('./src/routes/activityRoutes');
const feedbackRoutes = require('./src/routes/FeedBackRoutes');

app.use('/api/activities', activityRoutes);
app.use('/api/feedback', feedbackRoutes);

// Start the 1
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
