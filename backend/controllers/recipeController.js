const connection = require('../db');

exports.getAllRecipes = (req, res) => {
  connection.query('SELECT * FROM recipes', (err, results) => {
    if (err) {
      console.error('Error al obtener las recetas:', err);
      res.status(500).json({ error: 'Error al obtener las recetas' });
      return;
    }
    res.json(results);
  });
};

exports.getRecipeById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM recipes WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener la receta:', err);
      res.status(500).json({ error: 'Error al obtener la receta' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Receta no encontrada' });
      return;
    }
    res.json(results[0]);
  });
};

exports.createRecipe = (req, res) => {
  const { name, ingredients, instructions, image } = req.body;
  connection.query(
    'INSERT INTO recipes (name, ingredients, instructions, image) VALUES (?, ?, ?, ?)',
    [name, ingredients, instructions, image],
    (err, results) => {
      if (err) {
        console.error('Error al crear la receta:', err);
        res.status(500).json({ error: 'Error al crear la receta' });
        return;
      }
      res.json({ id: results.insertId, name, ingredients, instructions, image });
    }
  );
};

exports.updateRecipe = (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions, image } = req.body;
  connection.query(
    'UPDATE recipes SET name = ?, ingredients = ?, instructions = ?, image = ? WHERE id = ?',
    [name, ingredients, instructions, image, id],
    (err, results) => {
      if (err) {
        console.error('Error al actualizar la receta:', err);
        res.status(500).json({ error: 'Error al actualizar la receta' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Receta no encontrada' });
        return;
      }
      res.json({ id, name, ingredients, instructions, image });
    }
  );
};

exports.deleteRecipe = (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM recipes WHERE id = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Error al eliminar la receta:', err);
        res.status(500).json({ error: 'Error al eliminar la receta' });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Receta no encontrada' });
        return;
      }
      res.json({ message: 'Receta eliminada' });
    }
  );
};