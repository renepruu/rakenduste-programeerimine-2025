const express = require('express')
const app = express()
const port = 3000
const catsRoutes = require("./routes/cats.routes");
cors = require("cors");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/cats", catsRoutes);

