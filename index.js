let express = require('express');
let cors = require('cors');
require('dotenv').config()
let fs = require('fs');
const multer = require("multer");
let app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

let storage = multer.memoryStorage();
let upload = multer({storage: storage});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let jsonData;

  if(req.file === undefined){
    res.status(400).json({message: 'No file to upload'});
  } else {
    jsonData = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    }

    res.status(200).json(jsonData);
  }

  
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
