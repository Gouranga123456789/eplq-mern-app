const express = require('express');
const cors = require('cors');

process.env.PORT = "5001";

process.env.MONGO_URI = "mongodb+srv://gourangakalita17_db_user:YMVVswd4DJbEt15F@cluster0.ritfqm3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

process.env.JWT_SECRET = "3dbad60fceabf0930b643187f27d193f19038b7c8e686ac99d3209596219cff702d02f5f854e1cb1fa3082f40c80527c935c0b3d27f2ae8bd0166e31a4f022a1";

process.env.ENCRYPTION_KEY = "e5ab214f08b35339b8a577a04f6b29441f26a1ee70523594474a50e17314b477ccf5afaf7c32e6acc36e17ae9ec11ea60adefdecf1d7eb66d7beb6515d9946ca";

const connectDB = require('./db');

connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => res.send('EPLQ API Running'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/pois', require('./routes/poi.routes'));

// Use the PORT defined above
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
