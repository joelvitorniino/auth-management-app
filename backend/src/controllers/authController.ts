import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../prisma/client';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, name } = req.body;

  try {
    // Verifica se o e-mail já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};


export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
    // Verifica se o usuário está autenticado
    const token = req.header('Authorization')?.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401); // Não autorizado
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      const userId = decoded.id;
  
      // Busca o usuário no banco de dados
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
  
      if (!user) {
        return res.sendStatus(404); // Usuário não encontrado
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.sendStatus(403); // Token inválido
    }
  };