import Sequelize from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './events.db',
    define: {
        timestamps: false
    }
})

const Group = sequelize.define('group', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Event = sequelize.define('event', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING,
    begin: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

const Participant = sequelize.define('participant', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Group.hasMany(Event, {foreignKey: 'groupId'})
Event.belongsTo(Group, {foreignKey: 'groupId'})

Event.hasMany(Participant, {foreignKey: 'eventId'})
Participant.belongsTo(Event, {foreignKey: 'groupId'})

async function initialize() {
    await sequelize.authenticate()
    await sequelize.sync({force: true})
}

export {
    initialize,
    Group, Event, Participant
}