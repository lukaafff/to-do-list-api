import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const validateRegister = [
    body('name').notEmpty().withMessage('O nome é obrigatório.'),
    body('lastName').notEmpty().withMessage('O sobrenome é obrigatório.'),
    body('email').isEmail().withMessage('O email fornecido não é válido.'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres.'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('As senhas não são iguais.');
        }
        return true;
    }),
];

const validateLogin = [
    body('email').isEmail().withMessage('O email fornecido não é válido.'),
    body('password').notEmpty().withMessage('A senha é obrigatória.'),
];

async function register(req, res) {
    // Validation middleware for registration
    await Promise.all(validateRegister.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(422).json({ errors: errorMessages });
    }

    //Register user
    const {name, lastName, email, password, confirmPassword} = req.body

    //validations
    if(!name) {
        return res.status(422).json({msg: 'O nome é obrigatório!'})
    }
    if(!lastName) {
        return res.status(422).json({msg: 'O sobrebnome é obrigatório!'})
    }
    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório!'})
    }
    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatório!'})
    }
    if(password !== confirmPassword) {
        return res.status(422).json({msg: 'As senhas não são iguais!'})
    }

    //Check if user exists
    const userExists = await User.findOne({email: email})

    if(userExists) {
        return res.status(422).json({msg: 'Esse email já foi utilizado. Por favor utilize outro email!'})
    }

    //Create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //Create user
    const user = new User ({
        name,
        lastName,
        email,
        password: passwordHash
    })

    try {

        await user.save()

        res.status(201).json({msg: 'Usuário criado com sucesso!'})

    } catch(error) {
        console.log(error);
        res.status(500).json({msg: "Aconteceu um erro no servidor. Tente novamente mais tarde!"})
    }
}

async function login(req, res) {
    // Validation middleware for login
    await Promise.all(validateLogin.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(422).json({ errors: errorMessages });
    }

    const {email, password} = req.body

    //validations
    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório!'})
    }
    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatório!'})
    }

    //Check if user exists
    const user = await User.findOne({email: email})

    if(!user) {
        return res.status(404).json({msg: 'Usuário não encontrado!'})
    }

    //Check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(422).json({msg: 'Senha inválida!'})
    }

    try {

        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret);

        const userData = { ...user._doc };
        delete userData.password;

        res.status(200).json({ msg: 'Autenticação realizada com sucesso', token, user: userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Aconteceu um erro no servidor. Tente novamente mais tarde!' });
    }
}

export default { register, login };
