import connection from '../../database/connection';
import generateId from '../../utils/generateId';
import hashPassword from '../services/hashPassword';

class OngController {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  }

  async store(req, res) {
    const {
      name, email, whatsapp, city, uf, password,
    } = req.body;

    const id = generateId();
    const hashedPassword = await hashPassword(password);

    await connection('ongs').insert({
      id, name, email, whatsapp, city, uf, password: hashedPassword,
    });

    return res.json({ id, name });
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, whatsapp, city, uf, password,
    } = req.body;

    const hashedPassword = await hashPassword(password);

    await connection('ongs').update({
      id, name, email, whatsapp, city, uf, password: hashedPassword,
    });

    return res.json({ id });
  }
}

export default new OngController();
