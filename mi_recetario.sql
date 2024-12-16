-- Crear la base de datos
CREATE DATABASE mi_recetario;
USE mi_recetario;

-- Crear la tabla de recetas
CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  image VARCHAR(255) NULL
);

-- Crear la tabla de notas
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL
);

-- Crear la tabla de la lista de la compra
CREATE TABLE shopping_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item VARCHAR(255) NOT NULL
);

-- Crear la tabla de documentos
CREATE TABLE documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  file VARCHAR(255) NOT NULL
);

-- Crear la tabla del comparador
CREATE TABLE comparator (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item VARCHAR(255) NOT NULL
);