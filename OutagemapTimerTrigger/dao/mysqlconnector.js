var mysql = require('mysql');
var Sequelize = require("sequelize");
var objConfig = require('../config.js');
var objconnpool = null;
/**
 * @description - Code to connect with MySql
 * @param {Respose to be returned} callback
 * @return - callback
 */
function getDb(callback) {
    if (!objconnpool) {
        objconnpool = new Sequelize(objConfig.outputdatasource.database, objConfig.outputdatasource.username,
            objConfig.outputdatasource.password,
            {
                host: objConfig.outputdatasource.host,
                dialect: objConfig.outputdatasource.dialect,
                logging: objConfig.outputdatasource.logging,
                pool: {
                    max: 15,
                    min: 0,
                    idle: 120000,
                    maxIdleTime: 120000,
                    acquire: 100000
                },
                retry: {
                    match: 'ER_LOCK_DEADLOCK: Deadlock found when trying to get lock; try restarting transaction',
                    max: 3
                }
            }
        );
    }
    callback(null, objconnpool);
}

module.exports = {
    getDb: getDb,
};