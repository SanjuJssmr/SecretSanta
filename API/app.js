const express = require('express');
const router = require('./routes/router');
const cors = require('cors')
const multer = require('multer')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(multer().any())
app.use(cors({
    origin: "*"
}));

app.use("/employees", router)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});