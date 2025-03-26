import { createWebHistory, createRouter } from 'vue-router'

import StudentsView from '../views/StudentsView.vue'
import CreateStudentView from '../views/CreateStudentView.vue'

const routes = [
  { path: '/', name: 'students', component: StudentsView },
  { path: '/cadastro-alunos', name: 'cadastro', component: CreateStudentView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router