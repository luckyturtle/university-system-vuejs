import List from './components/List';
import Create from './components/Create';
import Detail from './components/Detail'

export default [
    { path: '', redirect: { name: 'course-list' } },
    { path: '/courses', name: "course-list", component: List },
    { path: '/create-course', name: "course-create", component: Create },
    { path: '/courses/:id', name: 'detail', component: Detail }
]