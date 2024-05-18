import React from "react";
import './App.css';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import OutletAdmin from "./admin/Outlet/OutletAdmin";
import OutletVisitor from "./cline/Outlet/OutletVisitor";
import Home2 from "./cline/Home/Home2";
import Home3 from "./cline/Home/Home3";
import Home4 from "./cline/Home/Home4";
import LoginPage from "./Users/LoginPage";
import CreateUser from "./Users/CreateUser";
import CreateArticales from "./admin/market/CreateArticales";
import ArticaleId from "./cline/market/ArticaleId";
import ArticalesIdAdmin from "./admin/market/ArticalesId";
import SupportPage from "./footer/SupportPage";
import Home2admin from "./admin/Home/Home2";
import Home3admin from "./admin/Home/Home3";
import Home4admin from "./admin/Home/Home4";
import RequireUser from "./Users/RequireUser";
import RefreshPage from "./refreshPage/RefreshPage"
import Loading from "./refreshPage/loading";
import UpDateUser from "./Users/UpDateUser";
import UpDateArticale from "./admin/market/UpDateArticale";
import ValiedToken from "./Users/valiedToken";
import AllAricales from "./cline/market/allAricales";
import ChangePassword from "./Users/ChangePassword";
import CategoryArticale from "./admin/market/CategoryArticale";
import CreateCategoryMarket from "./admin/market/createCategoryMarket";
import OutletExperience from "./experience/OutletExperience";
import GetCategoryMarket from "./experience/GetCategoryMarket";
import Market from "./experience/market";
import GetArticaleid from "./experience/getArticaleid";
import GetCategoryMarketCline from "./cline/market/GetCategoryMarketCline";
import ShoppingCartProvider from "./context/shoppingCartContext";
import CreateAnOffer from "./admin/market/CreateAnOffer";
import FinishMarket from "./cline/market/FinishMarket";

function App() {
  const YourComponent = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
      navigate('/GetCategoryMarket', { replace: true });
    }, []);

    return (
      <>
        {<OutletExperience />}
      </>
    );
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<YourComponent />} >
          <Route path="/GetCategoryMarket" element={<GetCategoryMarket />} />
          <Route path="/GetCategoryMarket/:category" element={<Market />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/GetArticaleid/:id" element={<GetArticaleid />} />
          <Route path="/CreateUser" element={<CreateUser />} />
          <Route path="/Articales/getArticales" element={<AllAricales />} />
        </Route>

        <Route path="*" element={<Navigate to="/GetCategoryMarket" />} />
        <Route element={<RefreshPage />}>

          <Route element={<RequireUser />}>
            <Route path="/cline" element={<OutletVisitor />}>
              <Route path="/cline/Articales">
                <Route path="/cline/Articales/getArticales/:category" element={<AllAricales />} />
                <Route path="/cline/Articales/getArticale/:id" element={<ArticaleId />} />
                <Route path="/cline/Articales/GetCategoryMarketCline" element={<GetCategoryMarketCline />} />
                <Route path="/cline/Articales/FinishMarket" element={<FinishMarket />}/>
              </Route>
              <Route path="/cline/Home">
                <Route path="/cline/Home/Home2" element={<Home2 />} />
                <Route path="/cline/Home/Home3" element={<Home3 />} />
                <Route path="/cline/Home/Home3/:id" element={<Home3 />} />
                <Route path="/cline/Home/Home4" element={<Home4 />} />
              </Route>
              <Route path="/cline/SupportPage" element={<SupportPage />} />
              <Route path="/cline/Users/ChangePassword/:id" element={<ChangePassword />} />
            </Route>
          </Route>

          <Route element={<ValiedToken />}>

            <Route path="/admin" element={<OutletAdmin />}>
              <Route path="/admin/Home">
                <Route path="/admin/Home/Home2" element={<Home2admin />} />
                <Route path="/admin/Home/Home4/:category" element={<CategoryArticale />} />
                <Route path="/admin/Home/Home3/:id" element={<Home3admin />} />
                <Route path="/admin/Home/Home4" element={<Home4admin />} />
              </Route>
              <Route path="/admin/user">
                <Route path="/admin/user/UpDateUser/:id" element={<UpDateUser />} />
                <Route path="/admin/user/ChangePassword/:id" element={<ChangePassword />} />
              </Route>
              <Route path="/admin/market">
                <Route path="/admin/market/UpDateArticale/:id" element={<UpDateArticale />} />
                <Route path="/admin/market/CreateArticales" element={<CreateArticales />} />
                <Route path="/admin/market/CreateCategory" element={<CreateCategoryMarket />} />
                <Route path="/admin/market/getArticales/:id" element={<ArticalesIdAdmin />} />
                <Route path="/admin/market/CreateAnOffer" element={<CreateAnOffer />} />
              </Route>
              <Route path="/admin/SupportPage" element={<SupportPage />} />
              <Route path="/admin/Loading" element={<Loading />} />
            </Route>
          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;