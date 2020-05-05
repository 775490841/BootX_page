import storagePlugin from './storagePlugin';
import setting from './setting';
import admin from './admin';
import department from './department';
import menu from './menu';
import permission from './permission';
import role from './role';
import word from './word';
import wordType from './wordType';
import post from './post';

export default {
  name: 'system',
  path: '/system',
  routes: [storagePlugin, setting, admin, department, menu, permission, role, word, wordType, post],
};
