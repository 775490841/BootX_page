import project from './project';
import entity from './entity';
import column from './column';

export default {
  name: 'code',
  path: '/code',
  routes: [project, entity, column],
};
