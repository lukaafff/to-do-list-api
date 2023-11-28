import jwt from 'jsonwebtoken';

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado: Token não fornecido.' });
    }

    try {
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret);
        
        const userIdFromToken = decoded.id;
        const requestedUserId = req.params.userId;
        
        /* console.log('userIdFromToken:', userIdFromToken);
        console.log('requestedUserId:', requestedUserId); */

        if (userIdFromToken !== requestedUserId) {
            return res.status(403).json({ msg: 'Acesso negado: Token inválido para este usuário.' });
        }

        next();
    } catch (error) {
        console.log('Erro na verificação do token:', error);
        return res.status(400).json({ msg: 'Token inválido!' });
    }
}

export default checkToken;
