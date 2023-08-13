const express = require('express');
const mongoConnect = require('./db/index')
const router = require('./routers')
const cors = require('cors')

const app = express();
const port = 5000;


app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoConnect()
router(app)


app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});
