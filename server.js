const express = require('express');
const app = express();
const Music = require('./models.js').Music;
const sequelize = require('./models.js').sequelize;
const bodyParser = require("body-parser");
const multer = require("multer");

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/music/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mpeg" ||
        file.mimetype === "audio/mp3" ||
        req.body.musicName.length > 40) {
        cb(null, true);
    } else {
        cb('Тип файла не подходит', false);
    }
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage: storageConfig,fileFilter: fileFilter}).single("music"));
app.use(bodyParser.json());
app.use(express.static('./static'));
sequelize.sync().then(result => {
}).catch(err => console.log(err));

app.post('/api/isAdd', async function (req, res) {
    let obj = {};
    console.log("req.body: ", req.body.isAdd,req.body.id);
    if (req.body.id) {
        await Music.update({isAdd: req.body.isAdd}, {where: {id: req.body.id}}).then(result => {
            obj.isAdd = req.body.isAdd;
            console.log(req.body.isAdd);
            res.json(obj);
        });
    } else {
        console.log('Что-то пошло не так');
    }
});

app.post('/api/article', async function (req, res) {
    let obj = {};
    console.log('body: ', req.body.list);
    if (req.body.list !== 'playlist') {
        await Music.findAll({where: {list: req.body.list}}).then(result => {
            obj.mass = result;
            res.json(obj);
        });
    } else {
        await Music.findAll({where: {isAdd: true}}).then(result => {
            obj.mass = result;
            res.json(obj);
        });
    }
});
app.post('/api/some', async function (req, res) {
    let obj = {};
    console.log('body: ', req.body.list);
    if (req.body.id) {
        await Music.findAll({where: {id: req.body.id}}).then(result => {
            obj.mass = result;
            res.json(obj);
        });
    } else {
        console.log("ничего не нашлось");
        obj.message = 'Такой музыки нет';
        res.json(obj);
    }
});

app.post('/api/addMusic', async function (req, res, next) {
    let obj = {};
    let filedata = req.file;
    console.log('filedata:', filedata);
    console.log('body:', req.body.musicName);
    if (!filedata) {
        obj.message = "Ошибка при загрузке файла. Возможно тип файла не поддерживается";
    } else {
        obj.message = "Файл загружен";
        let a = {
            authorName: req.body.authorName,
            musicName: req.body.musicName,
            list: "Popular",
            url: '/music/' + filedata.originalname
        }
        await Music.create(a).catch(err => console.log(err));

    }
    res.json(obj);

});


app.listen(4000);