import Header from './components/Layout/Header/Header.js';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import webFont from 'webfontloader';
import Footer from './components/Layout/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products.js';

import Loginsignup from './components/User/LoginSignUp.js';
import store from './Store';
import { loadUser } from './actions/userAction.js';
import UserOptions from './components/Layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile.js';
import ProtectedRoute from './components/Route/ProtectedRoute.js';
import UpdateProfile from './components/User/UpdateProfile.js';
import UpdatePassword from './components/User/UpdatePassword.js';
import ForgetPassword from './components/User/ForgetPassword.js';
import ResetPassword from './components/User/ResetPassword.js';
import Cart from './components/Cart/Cart.js';
import Shipping from './components/Cart/Shipping.js';
import ConfirmOrder from './components/Cart/ConfirmOrder.js';
import axios from 'axios';
import Payment from './components/Cart/Payment.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess.js';
import MyOrders from './components/Order/MyOrders.js';
import OrderDetails from './components/Order/OrderDetails.js';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList.js';
import NewProduct from './components/admin/NewProduct.js';
import UpdateProduct from './components/admin/UpdateProduct.js';
import OrderList from './components/admin/OrderList.js';
import ProcessOrder from './components/admin/ProcessOrder.js';
import UserList from './components/admin/UserList.js';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews.js';
import Contact from './components/Layout/Contact/Contact.js';
import About from './components/Layout/About/About.js';
import NotFound  from './components/Layout/NotFound/NotFound.js'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product/:id" exact component={ProductDetails} />
        <Route path="/products" exact component={Products} />
        <Route path="/products/:keyword" component={Products} />

        <ProtectedRoute path="/account" exact component={Profile} />
        <ProtectedRoute
          path="/password/update"
          exact
          component={UpdatePassword}
        />
        <Route path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute path="/me/update" exact component={UpdateProfile} />
        <Route path="/password/forget" exact component={ForgetPassword} />
        <Route path="/login" component={Loginsignup} />
        <Route path="/cart" component={Cart} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />

        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />

        <ProtectedRoute path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute path="/order/:id" component={OrderDetails} />

        <ProtectedRoute  isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />

        <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />

        <ProtectedRoute isAdmin={true} exact path="/admin/orders/" component={OrderList} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />

        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UserList} />

        <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={ProductReviews}
        />
        <Route component={window.location.pathname === "/process/paymen" ? null : NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
