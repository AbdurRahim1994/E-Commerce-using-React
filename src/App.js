import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from '../src/pages/User/LoginPage'
import RegistrationPage from '../src/pages/User/RegistrationPage'
import FullScreenLoader from '../src/components/Masterlayout/FullScreenLoader'
import NotFoundPage from '../src/pages/NotFound/NotFoundPage'
import UserDashboardPage from '../src/pages/Dashboard/UserDashboardPage'
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProfilePage from '../src/pages/User/ProfilePage'
import HomePage from '../src/pages/Home/HomePage'
import ProductViewPage from '../src/pages/Product/ProductViewPage'
import AdminRoute from '../src/components/AdminRoute/AdminRoute'
import AdminDashboardPage from '../src/pages/Dashboard/AdminDashboardPage'
import CategoryListPage from '../src/pages/Category/CategoryListPage'
import CategoryCreateUpdatePage from '../src/pages/Category/CategoryCreateUpdatePage'
import ProductListPage from '../src/pages/Product/ProductListPage'
import ProductCreateUpdatePage from '../src/pages/Product/ProductCreateUpdatePage'
import CartPage from "./pages/Cart/CartPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/Login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/Registration" element={<RegistrationPage></RegistrationPage>}></Route>
          <Route path="/Dashboard/ProductView" element={<ProductViewPage></ProductViewPage>}></Route>
          <Route path="/Dashboard/Cart" element={<CartPage></CartPage>}></Route>

          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="/Dashboard/User" element={<UserDashboardPage></UserDashboardPage>}></Route>
            <Route path="/Dashboard/User/Profile" element={<ProfilePage></ProfilePage>}></Route>
          </Route>

          <Route element={<AdminRoute></AdminRoute>}>
            <Route path="/Dashboard/Admin" element={<AdminDashboardPage></AdminDashboardPage>}></Route>
            <Route path="/Dashboard/CategoryList" element={<CategoryListPage></CategoryListPage>}></Route>
            <Route path="/Dashboard/Admin/Profile" element={<ProfilePage></ProfilePage>}></Route>
            <Route path="/Dashboard/CategoryCreateUpdate" element={<CategoryCreateUpdatePage></CategoryCreateUpdatePage>}></Route>
            <Route path="/Dashboard/ProductList" element={<ProductListPage></ProductListPage>}></Route>
            <Route path="/Dashboard/ProductCreateUpdate" element={<ProductCreateUpdatePage></ProductCreateUpdatePage>}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </BrowserRouter>
      <FullScreenLoader></FullScreenLoader>
    </div>
  );
}

export default App;
