import Products from './components/Products';
import Product from './components/Product';
import Users from './components/Users';
import User from './components/User';
 
export const routes = [
    {
      path: '/',
      name: 'iMain',
      component: Products,
      props: true,
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
      props: true,
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product,
      props: true,
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      props: true,
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User,
      props: true,
    },
];

