import Vue from 'vue';
import Router from 'vue-router';
import index from '../pages/index';
import movie from '../pages/movie';
import book from '../pages/book';
import group from '../pages/group';
import status from '../pages/status';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/',
          redirect: 'movie',
        },
        {
          path: 'movie',
          name: 'movie',
          component: movie,
        },
        {
          path: 'book',
          name: 'book',
          component: book,
        },
        {
          path: 'group',
          name: 'group',
          component: group,
        },
        {
          path: 'status',
          name: 'status',
          component: status,
        },
      ],
    },
  ],
});
