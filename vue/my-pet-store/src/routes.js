import Main from './components/Main';
import Form from './components/Form';
import Product from './components/Product';
 
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
    {
      path: '/product/:id',
      name: 'Id',
      component: Product,
      props: true,
    },
];

