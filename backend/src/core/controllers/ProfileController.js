import crypto from 'crypto';
import connection from '../../database/connection';

class ProfileController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents')
      .where('ong_id', req.ong)
      .count();

    const ongs = await connection('incidents')
      .where('ong_id', req.ong)
      .limit(6)
      .offset((page - 1) * 6)
      .select('*');

    // res.header('X-Total-Count', count['count(*)']);

    return res.json({ ongs, total: count['count(*)'] });
  }

  // TO DO >>>

  async store(req, res) {
    const {
      name, email, whatsapp, city, uf,
    } = req.body;

    const id = crypto.randomBytes(4).toString('hex');

    await connection('ongs').insert({
      id, name, email, whatsapp, city, uf,
    });

    return res.json({ id });
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, email, whatsapp, city, uf,
    } = req.body;

    await connection('ongs').update({
      id, name, email, whatsapp, city, uf,
    });

    return res.json({ id });
  }
}

export default new ProfileController();
