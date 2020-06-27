import { verify } from 'jsonwebtoken';
import jwtConfig from '../../config/jwt';

export default function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { secret } = jwtConfig;

    const decoded = verify(token, secret);

    req.ong = decoded.sub;
    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}
