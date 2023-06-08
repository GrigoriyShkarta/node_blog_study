import express from 'express';
import multer from 'multer';
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

import {registerValidation, loginValidation, postCreateValidation} from "./validation/validations.js";
import {checkAuth, handleValidationErrors} from "./utils/index.js";
import {UserController, PostController} from "./controllers/index.js"

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.eapn5gq.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) =>console.log('DB error', err))

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Папка, в которую будут сохранены файлы
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);

app.listen(4444, (err)=> {
    if (err) {
        return console.log(err);
    }

    console.log('server ok')
})