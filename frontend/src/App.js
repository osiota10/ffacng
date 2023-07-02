import './main.css'
import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from './components/pages/home';
import About from './components/pages/about';
import Services from './components/pages/services';
import Contact from './components/pages/contact';
import PrivacyPolicy from './components/pages/privacyPolicy';
import TermsAndConditions from './components/pages/termsAndConditions';
import NoPage from './components/pages/noPage';
import Layout from './components/pages/layout';
import Login from './components/pages/auth/login';
import ResetPassword from './components/pages/auth/resetPassword';
import ResetPasswordConfirm from './components/pages/auth/passwordResetConfirm';
import Activate from './components/pages/auth/activate';
import MlMarketing from './components/pages/mlMarketing';
import 'react-pulse-dot/dist/index.css'
import ServiceDetail from './components/detailed/serviceDetail';
import { Provider } from 'react-redux';
import store from './store';
import DashboardHome from './components/dashboard';
import DashboardLayout from './components/dashboard/layout';
import EditProfile from './components/dashboard/editProfile';
import Withdrawals from './components/dashboard/withdrawals';
import Levels from './components/dashboard/levels';
import Downlines from './components/dashboard/downlines';
import Payments from './components/dashboard/payments';
import Referrals from './components/dashboard/referrals';
import Support from './components/dashboard/support';
import CreateAccount from './components/pages/auth/signup';
import { isAuthenticated } from './components/cards/utilities/privateRoute';
import Notifications from './components/dashboard/notification';
import ScrollToTop from './components/dashboard/components/scrollToTop';


export const ServiceContext = createContext(null)
export const TestimoninailContext = createContext(null)
export const CompanyInformationContext = createContext(null)
export const NetworkMarketingContext = createContext(null)


function App() {
  const [service, setService] = useState([]);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [networkMarketing, setNetworkMarkeeting] = useState([]);


  useEffect(() => {
    // Network Marketing
    axios.get(`${process.env.REACT_APP_API_URL}/network-marketing/1`)
      .then(res => {
        setNetworkMarkeeting(res.data)
      })

    //Service
    axios.get(`${process.env.REACT_APP_API_URL}/services`)
      .then(res => {
        setService(res.data)
      })

    // Company Information
    axios.get(`${process.env.REACT_APP_API_URL}/company-information/1`)
      .then(res => {
        setCompanyInfo(res.data)
      })
  }, []);

  return (
    <main>
      <Provider store={store}>
        <CompanyInformationContext.Provider value={companyInfo}>
          <ServiceContext.Provider value={service}>
            <NetworkMarketingContext.Provider value={networkMarketing}>
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="services" element={<Services />} />
                    <Route path="services/:slug" element={<ServiceDetail />} />
                    <Route path="mlm-marketing" element={<MlMarketing />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="*" element={<NoPage />} />
                  </Route>

                  <Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<CreateAccount />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
                    <Route path='/activate/:uid/:token' element={<Activate />} />
                  </Route>

                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="/dashboard/edit-profile" element={<EditProfile />} />
                    <Route path="/dashboard/withdrawals" element={<Withdrawals />} />
                    <Route path="/dashboard/levels" element={<Levels />} />
                    <Route path="/dashboard/downlines" element={<Downlines />} />
                    <Route path="/dashboard/payments" element={<Payments />} />
                    <Route path="/dashboard/referrals" element={<Referrals />} />
                    <Route path="/dashboard/help-and-support" element={<Support />} />
                    <Route path="/dashboard/notifications" element={<Notifications />} />
                  </Route >

                </Routes>
              </BrowserRouter>
            </NetworkMarketingContext.Provider>
          </ServiceContext.Provider>
        </CompanyInformationContext.Provider>
      </Provider>
    </main>
  );
}

export default App;
