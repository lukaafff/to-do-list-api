import User from '../models/User.js';

async function getUserById(req, res) {
    const userId = req.params.userId; 

    try {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Aconteceu um erro no servidor. Tente novamente mais tarde!' });
    }
}

async function updateUser(req, res) {
    const userId = req.params.userId;
    const updateFields = req.body; 

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true, select: '-password' }
        );

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }

        res.status(200).json({ msg: 'Dados do usuário atualizados com sucesso!', user });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao atualizar dados do usuário.' });
    }
}

async function deleteUser(req, res) {
    const userId = req.params.userId; 
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }

        res.status(200).json({ msg: 'Usuário deletado com sucesso!', deletedUser });
    } catch (error) {
        res.status(500).json({ msg: 'Erro ao deletar usuário.' });
    }
}


export default { getUserById, updateUser, deleteUser };
