const connection = require('../db');

exports.getAllNotes = (req, res) => {
  connection.query('SELECT * FROM notes', (err, results) => {
    if (err) {
      console.error('Error al obtener las notas:', err);
      res.status(500).json({ error: 'Error al obtener las notas' });
      return;
    }
    res.json(results);
  });
};

exports.createNote = (req, res) => {
  const { title, content } = req.body;
  connection.query(
    'INSERT INTO notes (title, content) VALUES (?, ?)',
    [title, content],
    (err, results) => {
      if (err) {
        console.error('Error al crear una nota:', err);
        res.status(500).json({ error: 'Error al crear una nota' });
        return;
      }
      res.json({ id: results.insertId, title, content });
    }
  );
};

exports.updateNote = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  connection.query(
    'UPDATE notes SET title = ?, content = ? WHERE id = ?',
    [title, content, id],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar la nota:', err);
        res.status(500).json({ error: 'Error al actualizar la nota' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Nota no encontrada' });
        return;
      }
      res.json({ id, title, content });
    }
  );
};

exports.deleteNote = (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM notes WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Error al eliminar la nota:', err);
        res.status(500).json({ error: 'Error al eliminar la nota' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Nota no encontrada' });
        return;
      }
      res.json({ message: 'Nota eliminada' });
    }
  );
};