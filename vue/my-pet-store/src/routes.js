import Main from './components/Main';
import Form from './components/Form';
 
export const routes = [
    {
      path: '/',
      name: 'iMain',
      component: Main,
      props: true,
    },
    {
      path: '/form',
      name: 'Form',
      component: Form,
      props: true,
    },
];

