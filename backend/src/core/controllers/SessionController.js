import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import connection from '../../database/connection';
import jwtConfig from '../../config/jwt';

class SessionController {
  async store(req, res) {
    const { id, password } = req.body;

    const ong = await connection('ongs')
      .where('id', id)
      .select('name', 'email', 'password')
      .first();

    if (!ong) {
      return res.status(401)
        .json({ error: 'Invalid ID/Password combination' });
    }

    const passwordMatched = await compare(password, ong.password);

    if (!passwordMatched) {
      return res.status(401)
        .json({ error: 'Invalid ID/Password combination' });
    }

    const { secret, expiresIn } = jwtConfig;

    const token = sign({}, secret, {
      subject: String(ong.id),
      expiresIn,
    });

    delete ong.password;

    return res.json({ ong, token });
  }
}

export default new SessionController();
