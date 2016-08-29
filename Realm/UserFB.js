import Realm from 'realm';

class UserFB extends Realm.Object {}
UserFB.schema = {
  name: 'UserFB',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', default: 1},
    iduser: {type: 'string'},
    name: {type: 'string'},
    gender: {type: 'string'},
    picture: {type: 'string', optional:true},
    email: {type: 'string'},
    birthday: {type: 'string'}
  }
};

class PruebaUser2 extends Realm.Object {}
PruebaUser2.schema = {
  name: 'PruebaUser2',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', default: 1},
    iduser: {type: 'string'},
    name: {type: 'string'}
  }
};

export default new Realm({schema: [PruebaUser2]});
