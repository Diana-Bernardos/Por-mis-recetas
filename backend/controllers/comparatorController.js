const connection = require('../db');

exports.getComparatorData = (req, res) => {
  connection.query('SELECT * FROM comparator', (err, results) => {
    if (err) {
      console.error('Error al obtener los datos del comparador:', err);
      res.status(500).json({ error: 'Error al obtener los datos del comparador' });
      return;
    }
    res.json(results);
  });
};

exports.addToComparator = (req, res) => {
  const { item } = req.body;
  connection.query(
    'INSERT INTO comparator (item) VALUES (?)',
    [item],
    (err, results) => {
      if (err) {
        console.error('Error al agregar al comparador:', err);
        res.status(500).json({ error: 'Error al agregar al comparador' });
        return;
      }
      res.json({ id: results.insertId, item });
    }
  );
};

exports.removeFromComparator = (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM comparator WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Error al eliminar del comparador:', err);
        res.status(500).json({ error: 'Error al eliminar del comparador' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Elemento no encontrado en el comparador' });
        return;
      }
      res.json({ message: 'Elemento eliminado del comparador' });
    }
  );
};