const express = require('express');
const router = express.Router();
const recipeController = require('./controllers/recipeController');
const noteController = require('./controllers/noteController');
const shoppingListController = require('./controllers/shoppingListController');
const documentController = require('./controllers/documentController');
const comparatorController = require('./controllers/comparatorController');

// Rutas de recetas
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipeById);
router.post('/recipes', recipeController.createRecipe);
router.put('/recipes/:id', recipeController.updateRecipe);
router.delete('/recipes/:id', recipeController.deleteRecipe);

// Rutas de notas
router.get('/notes', noteController.getAllNotes);
router.post('/notes', noteController.createNote);
router.put('/notes/:id', noteController.updateNote);
router.delete('/notes/:id', noteController.deleteNote);

// Rutas de lista de la compra
router.get('/shopping-list', shoppingListController.getShoppingList);
router.post('/shopping-list', shoppingListController.addToShoppingList);
router.delete('/shopping-list/:id', shoppingListController.removeFromShoppingList);

// Rutas de documentos
router.get('/documents', documentController.getAllDocuments);
router.post('/documents', documentController.uploadDocument);
router.delete('/documents/:id', documentController.deleteDocument);

// Rutas del comparador
router.get('/comparator', comparatorController.getComparatorData);
router.post('/comparator', comparatorController.addToComparator);
router.delete('/comparator/:id', comparatorController.removeFromComparator);

module.exports = router;