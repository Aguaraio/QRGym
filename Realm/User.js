'use strict';

import Realm from 'realm';

class User extends Realm.Object {}
User.schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: {type: 'int', default: 1},
        done: {type: 'bool', default: false},
    },
};

class Bulking extends Realm.Object {}
Bulking.schema = {
    name: 'Bulking',
    primaryKey: 'id',
    properties: {
        id: {type: 'int'},
        gifString: {type: 'string'},
        weight: {type: 'string'},
        repeat: {type: 'string'},
        userSend: {type: 'string', optional: true},
    },
};

export default new Realm({schema: [User, Bulking]});
