const connection = require('../db');

exports.getShoppingList = (req, res) => {
  connection.query('SELECT * FROM shopping_list', (err, results) => {
    if (err) {
      console.error('Error al obtener la lista de la compra:', err);
      res.status(500).json({ error: 'Error al obtener la lista de la compra' });
      return;
    }
    res.json(results);
  });
};

exports.addToShoppingList = (req, res) => {
  const { item } = req.body;
  connection.query(
    'INSERT INTO shopping_list (item) VALUES (?)',
    [item],
    (err, results) => {
      if (err) {
        console.error('Error al agregar a la lista de la compra:', err);
        res.status(500).json({ error: 'Error al agregar a la lista de la compra' });
        return;
      }
      res.json({ id: results.insertId, item });
    }
  );
};

exports.removeFromShoppingList = (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM shopping_list WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Error al eliminar de la lista de la compra:', err);
        res.status(500).json({ error: 'Error al eliminar de la lista de la compra' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Elemento no encontrado en la lista de la compra' });
        return;
      }
      res.json({ message: 'Elemento eliminado de la lista de la compra' });
    }
  );
};