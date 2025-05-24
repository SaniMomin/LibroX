//User All Import
import WelcomeUR from './Users/WelcomeUR';
import LoginUR from './Users/LoginUR';
import SignupUR from './Users/SignupUR';
import UsersDashboard from './Users/UsersDashboard';
import HomeUR from './Users/HomeUR';
import SearchUR from './Users/SearchUR';
import AdvertiseUR from './Users/AdvertiseUR';
import BookDetailsUR from './Users/BookDetailsUR';
import ReadingPDFUR from './Users/ReadingPDFUR';
import ListeningPDFUR from './Users/ListeningPDFUR';
import OrderBookUR from './Users/OrderBookUR';
import AboutUR from './Users/AboutUR';
import ContactUR from './Users/ContactUR';
import ProfileUR from './Users/ProfileUR';
import UpdatePhotoUR from './Users/UpdatePhotoUR';
import UpdateProfileUR from './Users/UpdateProfileUR';
import ForgotPassUR from './Users/ForgotPassUR';
import SubscriptionListUR from './Users/SubscriptionListUR';
import SubPaymentUR from './Users/SubPaymentUR';
import OrderListUR from './Users/OrderListUR';
import LikesUR from './Users/LikesUR';
import WishlistUR from './Users/WishlistUR';
import NotificationUR from './Users/NotificationUR';


import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';

//Admin All Imports
import LoginAD from './Admin/LoginAD';
import AdminDashboard from './Admin/AdminDashboard';
import HomeAD from './Admin/HomeAD';
import UpdateBookAD from './Admin/UpdateBookAD';
import AllCommentAD from './Admin/AllCommentAD';
import SearchAD from './Admin/SearchAD';
import AddBookAD from './Admin/AddBookAD';
import OrderListAD from './Admin/OrderListAD';
import UpdateSubAD from './Admin/UpdateSubAD';
import AdvertiseAD from './Admin/AdvertiseAD';
import AddAdvertiseAD from './Admin/AddAdvertiseAD';
import UpdateAdvertiseAD from './Admin/UpdateAdvertiseAD';


function App() {
  const rout1 = createBrowserRouter(([
    { path: '/loginAD', element: <LoginAD /> },
    {
      path: '/adminDashboard', element: <AdminDashboard />, children: (([
        { path: 'homeAD', element: <HomeAD /> },
        { path: 'updateBookAD', element: <UpdateBookAD /> },
        { path: 'commentsAD/:bkid', element: <AllCommentAD /> },
        { path: 'searchAD', element: <SearchAD /> },
        { path: 'addBookAD', element: <AddBookAD /> },
        { path: 'orderListAD', element: <OrderListAD /> },
        { path: 'updateSubAD', element: <UpdateSubAD /> },
        { path: 'advertiseAD', element: <AdvertiseAD /> },
        { path: 'addAdvertiseAD', element: <AddAdvertiseAD /> },
        { path: 'updateAdvertiseAD', element: <UpdateAdvertiseAD /> },
      ]))
    },
    { path: '/', element: <WelcomeUR /> },
    { path: '/loginUR', element: <LoginUR /> },
    { path: '/passwordChange', element: <ForgotPassUR /> },
    { path: '/signupUR', element: <SignupUR /> },
    {
      path: '/userDashboard', element: <UsersDashboard />, children: (([
        { path: 'homeUR', element: <HomeUR /> },
        { path: 'searchUR', element: <SearchUR /> },
        { path: 'advertiseUR', element: <AdvertiseUR /> },
        { path: 'bookDetailsUR/:bid', element: <BookDetailsUR /> },
        { path: 'readingpdfUR', element: <ReadingPDFUR /> },
        { path: 'listeningpdfUR', element: <ListeningPDFUR /> },
        { path: 'orderBookUR', element: <OrderBookUR /> },
        { path: 'aboutUR', element: <AboutUR /> },
        { path: 'contactUR', element: <ContactUR /> },
        { path: 'profileUR', element: <ProfileUR /> },
        { path: 'updatePhotoUR', element: <UpdatePhotoUR /> },
        { path: 'updateProfileUR', element: <UpdateProfileUR /> },
        { path: 'subscriptionListUR', element: <SubscriptionListUR /> },
        { path: 'subPaymentUR', element: <SubPaymentUR /> },
        { path: 'orderListUR', element: <OrderListUR /> },
        { path: 'liked', element: <LikesUR /> },
        { path: 'wishlistUR', element: <WishlistUR /> },
        { path: 'notificationUR', element: <NotificationUR /> },
      ]))
    },
  ]));

  return (
    <div>
      <RouterProvider router={rout1} />
    </div>
  );
}

export default App;
