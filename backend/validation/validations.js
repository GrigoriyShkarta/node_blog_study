import {body} from 'express-validator';

export const loginValidation = [
    body('email', 'invalid Email').isEmail(),
    body('password', 'password must have more 5 symbol').isLength({min: 5}),
];

export const registerValidation = [
    body('email', 'invalid Email').isEmail(),
    body('password', 'password must have more 5 symbol').isLength({min: 5}),
    body('fullName', 'unCorrect name').isLength({min: 3}),
    body('avatarUrl', 'invalid ava').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'article title missing').isLength({min: 3}).isString(),
    body('text', 'enter the text of the article').isLength({min: 3}).isString(),
    body('tags', 'invalid tag format').optional().isString(),
    body('imageUrl', 'invalid image link').optional().isString(),
];