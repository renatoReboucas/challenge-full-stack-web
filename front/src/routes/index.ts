import { createWebHistory, createRouter } from 'vue-router'

import StudentsView from '../views/StudentsView.vue'
import FormStudentView from '../views/FormStudentView.vue'

const routes = [
  { path: '/', name: 'students', component: StudentsView },
  {
    path: '/editar-aluno/:id',
    name: 'form',
    component: FormStudentView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
