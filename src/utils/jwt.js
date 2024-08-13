import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const createToken = (payload, duration) => jwt.sign(payload, config.SECRET, { expiresIn: duration });
