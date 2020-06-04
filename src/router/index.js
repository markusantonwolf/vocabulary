import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import(/* webpackChunkName: "categories" */ '../views/Categories.vue'),
  },
  {
    path: '/categories/:category',
    name: 'Category',
    props: true,
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
  },
  {
    path: '/categories/:category/:content_id',
    name: 'CategoryItem',
    props: true,
    component: () => import(/* webpackChunkName: "word" */ '../views/Word.vue'),
  },
  {
    path: '/sentences',
    name: 'Sentences',
    component: () => import(/* webpackChunkName: "sentences" */ '../views/Sentences.vue'),
  },
  {
    path: '/sentences/:group',
    name: 'Sentence',
    props: true,
    component: () => import(/* webpackChunkName: "sentence" */ '../views/Sentence.vue'),
  },
  {
    path: '/sentences/:group/:content_id',
    name: 'SentenceItem',
    props: true,
    component: () => import(/* webpackChunkName: "sentenceitem" */ '../views/SentenceItem.vue'),
  },
  {
    path: '/lessons',
    name: 'Lessons',
    component: () => import(/* webpackChunkName: "lessons" */ '../views/Lessons.vue'),
  },
  {
    path: '/lessons/:lesson',
    name: 'Lesson',
    props: true,
    component: () => import(/* webpackChunkName: "lesson" */ '../views/Lesson.vue'),
  },
  {
    path: '/lessons/:lesson/:content_id',
    name: 'LessonItem',
    props: true,
    component: () => import(/* webpackChunkName: "word" */ '../views/Word.vue'),
  },
  {
    path: '/training',
    name: 'Trainings',
    props: true,
    component: () => import(/* webpackChunkName: "word" */ '../views/Trainings.vue'),
  },
  {
    path: '/training/:filter',
    name: 'Training',
    props: true,
    component: () => import(/* webpackChunkName: "word" */ '../views/Training.vue'),
  },
  {
    path: '/training/:filter/:value',
    name: 'TrainingCard',
    props: true,
    component: () => import(/* webpackChunkName: "word" */ '../views/Card.vue'),
  },
  {
    path: '/search/:query?',
    name: 'Search',
    props: true,
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
  },
  {
    path: '/*',
    name: 'Error',
    props: true,
    component: () => import(/* webpackChunkName: "error" */ '../views/Error.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'is-exact-active',
  linkActiveClass: 'is-active',
  routes,
})

// router.beforeEach((to, from, next) => {
//   console.info('to', to)
//   console.info('i18n', i18n.t('monday'))
//   next()
// })

export default router
