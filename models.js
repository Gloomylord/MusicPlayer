const Sequelize = require("sequelize");
const sequelize = new Sequelize("musicInfo", "musicUse", "password", {
    dialect: "mysql",
    host: "localhost"
});


const Music = sequelize.define("music", {
    musicName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    list: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdd:{
        type: Sequelize.BOOLEAN,
    },
    authorName:{
        type: Sequelize.STRING,
    }
});

module.exports.sequelize = sequelize;
module.exports.Music = Music;

