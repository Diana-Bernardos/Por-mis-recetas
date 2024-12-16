const connection = require('../db');

exports.getAllDocuments = (req, res) => {
  connection.query('SELECT * FROM documents', (err, results) => {
    if (err) {
      console.error('Error al obtener los documentos:', err);
      res.status(500).json({ error: 'Error al obtener los documentos' });
      return;
    }
    res.json(results);
  });
};

exports.uploadDocument = (req, res) => {
  const { title, file } = req.body;
  connection.query(
    'INSERT INTO documents (title, file) VALUES (?, ?)',
    [title, file],
    (err, results) => {
      if (err) {
        console.error('Error al subir un documento:', err);
        res.status(500).json({ error: 'Error al subir un documento' });
        return;
      }
      res.json({ id: results.insertId, title, file });
    }
  );
};

exports.deleteDocument = (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM documents WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Error al eliminar un documento:', err);
        res.status(500).json({ error: 'Error al eliminar un documento' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Documento no encontrado' });
        return;
      }
      res.json({ message: 'Documento eliminado' });
    }
  );
};