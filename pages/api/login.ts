import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../middlewares/connectToDB';
import { UserModel } from '../../models/User';
import { DefaultMessageResponse } from '../../types/DefaultMessageResponse';
import { User } from '../../types/User';

const loginEndpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMessageResponse | any>) => {

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método informado não existe' });
    }

    const { MY_SECRET_KEY } = process.env;
    if (!MY_SECRET_KEY) {
      return res.status(500).json({ error: 'Env MY_SECRET_KEY não informada' });
    }

    if (!req.body) {
      return res.status(400).json({ error: 'Favor informar os dados para autenticação' });
    }

    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: 'Favor informar os dados para autenticação' });
    }

    const existsUserWithEmail = await UserModel.find({ email: login });
    if (!existsUserWithEmail || existsUserWithEmail.length === 0) {
      return res.status(400).json({ error: 'Usuário e senha não conferem' });
    }

    const user = existsUserWithEmail[0] as User;
    const bytes = CryptoJS.AES.decrypt(user.password, MY_SECRET_KEY);
    const savedPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (password === savedPassword) {
      const token = jwt.sign({ _id: user._id }, MY_SECRET_KEY);

      const result = {
        token,
        name: user.name,
        email: user.email
      }

      return res.status(200).json(result);
    }

    return res.status(400).json({ msg: 'Usuário e senha não conferem!' });

  } catch (e: any) {
    console.log('Ocorreu um erro ao logar usuário:', e);
    return res.status(500).json({ error: 'Ocorreu um erro ao logar o usuário' })
  }

}

export default connectToDB(loginEndpoint);
