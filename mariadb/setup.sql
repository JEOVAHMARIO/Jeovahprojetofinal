CREATE TABLE papeis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45)
);
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    senha VARCHAR(45),
    id_papel INT,
    FOREIGN KEY (id_papel) REFERENCES papeis(id)
);
CREATE TABLE lanches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    valor VARCHAR(45),
    quantidade INT
);