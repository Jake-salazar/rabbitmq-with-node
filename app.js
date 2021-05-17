const express =  require('express');
const multer = require('multer');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file,cb)=>{
        cb(null, './uploads');
    },
    filename: (req,file, cb)=>{
        cb(null,Date.now() + '--' + file.originalname);
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

const upload = multer({storage:fileStorage});

app.post('/single',upload.single('fileUpload'),(req,res)=>{
    console.log(req.file);
    res.send("Single file upload success");
});


app.listen(3000, () => {
    console.log('server listening at port 3000');
  });