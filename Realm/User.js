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

export default new Realm({schema: [User]});
