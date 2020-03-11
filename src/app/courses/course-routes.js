import CourseList from './components/CourseList';
import CourseCreate from './components/CourseCreate';

export default [
    { path: '', redirect: { name: 'course-list' } },
    { path: '/courses', name: "course-list", component: CourseList },
    { path: '/create-course', name: "course-create", component: CourseCreate },
    { path: '/courses/:id', name: 'detail' }
]