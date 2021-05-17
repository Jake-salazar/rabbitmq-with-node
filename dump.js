const express =  require('express');
const multer = require('multer');
const amqplib = require('amqplib/callback_api');
const mongoose = require('./models/connection');
const postController = require('./controllers/postController');




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

async function uploadPost(req,res){

    const { caption } = req.body;

    var folder = "img/"+req.file.originalname;
    console.log('caption = ' + req.body.caption);
    console.log(folder);

    var post = {
        img: folder,
        caption: req.body.caption
    }


    await amqplib.connect('amqp://localhost', (connError, connection) => {
        if (connError) {
            throw connError;
        }
        // Step 2: Create Channel
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError;
            }
            // Step 3: Assert Queue
            const QUEUE = 'post'
            channel.assertQueue(QUEUE);
            // Step 4: Send message to queue
            const qm = JSON.stringify({img:folder,caption:req.body.caption})
            channel.sendToQueue(QUEUE, Buffer.from(qm));
            console.log(`Message received ${qm}`);
            postController.generatePosts(qm);
        })
    })
    res.redirect('/');
}


app.post('/single',upload.single('fileUpload'),uploadPost,(req,res)=>{
    console.log(req);
    res.send("Single file upload success");
});


app.listen(3000, () => {
    console.log('server listening at port 3000');
  });



async function getPost(){

    await amqp.connect('amqp://localhost', (connError, connection) => {
        if (connError) {
            throw connError;
        }
        // Step 2: Create Channel
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError;
            }
            // Step 3: Assert Queue
            const QUEUE = 'post'
            channel.assertQueue(QUEUE);
            // Step 4: Receive Messages
            channel.consume(QUEUE, (msg) => {
                console.log(`Message received: ${msg.content.toString()}`)
    
            }, {
                noAck: true
            })
        })
    })
}