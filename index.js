/**
 * Fichier principal Application NodeJs
 */

//  Appel de la bibliothèque HTTP
const server = require('http');

let name = 'Han';

// Création du serveur NodeJS
server.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(
        `<h1>${name} shot first !!!</h1>`
    );
}).listen(3000); //équivaut à refaire à la ligne: server.listen(8080);

// // Réécriture en version ES6 de la création du serveur
// server.createServer(
//     (req, res) => {

//     }
// ).listen(8080)