import mongoose from 'mongoose';

const connectDataBase = () => {
    console.log("Tentando conectar");

    const uri = process.env.MONGODB_URI;

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    mongoose.connect(uri, options)
        .then(() => console.log("Conectado ao banco de dados"))
        .catch((err) => console.error("Erro ao conectar com o banco de dados:", err));
};

export default connectDataBase;