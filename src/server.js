const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const sequelize = require('./config/sequelize'); 
const models = require('./model');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.app.use(bodyParser.json());

        const routeConfigPath = path.join(__dirname, 'routes-config.json');
        const routeConfig = JSON.parse(fs.readFileSync(routeConfigPath, 'utf-8'));

        routeConfig.forEach(route => {
            const { path, router } = route;
            const modulo = require(`./routes/${router}`);
            this.app.use(path, modulo);
        });
    }

    async start() {
        try {
            await sequelize.sync();
            console.log('Tabelas sincronizadas com sucesso');
            
            this.app.listen(this.port, () => {
                console.log(`Servidor ouvindo na porta ${this.port}`);
            });
        } catch (error) {
            console.error('Erro ao sincronizar tabelas:', error);
        }
    }
}

module.exports = new Server();
