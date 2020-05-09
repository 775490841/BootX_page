import deploy from './deploy';
import model from './model';
import manager from './manager';
import follow from './follow';

export default {
  name: 'flow',
  path: '/flow',
  routes: [model, deploy, manager, follow],
};
