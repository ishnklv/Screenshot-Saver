const express = require('express');
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express();
const PORT = parseInt(process.env.PORT) || 3000;

app.use(cors())
app.use(express.json())

app.post('/upload', async (req, res) => {
  try {
    const blob = req.body.blob;
    const base64 = blob.replace(/^data:image\/png;base64,/, "");
    if (!blob) {
      res.json({ status: 400, error: 'buffer not found' })
    }

    const buffer = Buffer.from(base64, 'base64');
    const stream = fs.createWriteStream(path.join(__dirname, 'screenshots', `${Date.now()}.png`));
    stream.write(buffer, (err) => {
      if (err) {
        console.log(err);
      }
    })
  } catch (e) {
    console.log(e);
  }
})

const bootstrap = () => {
  try {
    app.listen(PORT, () => console.log(`Application starting on port = ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

bootstrap();
