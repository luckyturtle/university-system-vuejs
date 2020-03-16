import List from './components/List.vue';
import Create from './components/Create.vue';
import Detail from './components/Detail.vue'

export default [
    { path: '', redirect: { name: 'course-list' } },
    { path: '/courses', name: "course-list", component: List },
    { path: '/create-course', name: "course-create", component: Create },
    { path: '/courses/:id', name: 'detail', component: Detail }
]