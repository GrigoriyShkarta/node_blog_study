import {body} from 'express-validator';

export const registerValidation = [
    body('email', 'invalid Email').isEmail(),
    body('password', 'password must have more 5 symbol').isLength({min: 5}),
    body('fullName', 'unCorrect name').isLength({min: 3}),
    body('avatarUrl', 'invalid ava').optional().isURL(),
];