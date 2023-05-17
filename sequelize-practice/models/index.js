const Sequelize = require('sequelize');

const Member = require('./member')
const Wallet = require('./wallet')
const Asset = require('./asset')

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Member = Member;
db.Wallet = Wallet;
db.Asset = Asset;

Member.init(sequelize)
Wallet.init(sequelize)
Asset.init(sequelize)

Member.associate(db)
Wallet.associate(db)
Asset.associate(db)

module.exports = db;