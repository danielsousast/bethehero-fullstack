/* eslint-disable camelcase */
import connection from '../../database/connection';

class IncidentController {
  // List all incidents
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  }

  async show(req, res) {
    const { id } = req.params;

    const incident = await connection('incidents')
      .where('id', id)
      .first();

    if (!incident) {
      return res.status(400).json({ error: 'Incident does not found' });
    }

    return res.json(incident);
  }

  // Create a Incident
  async store(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.ong;

    const [id] = await connection('incidents').insert({
      title, description, value, ong_id,
    });

    return res.json({ id });
  }

  // Update a Incident
  async update(req, res) {
    const { id } = req.params;
    const { title, description, value } = req.body;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== req.ong) {
      return res.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('incidents').where('id', id).update({
      title, description, value,
    });

    return res.json();
  }

  // Delete a Incident
  async destroy(req, res) {
    const { id } = req.params;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== req.ong) {
      return res.status(401).json({ error: 'Operation not permitted' });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}

export default new IncidentController();
