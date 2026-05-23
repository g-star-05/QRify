import { Routes, Route } from "react-router-dom";

/* PAGES */

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PricingPage from "./pages/PricingPage";
import DashboardPage from "./pages/DashboardPage";
import TemplatesPage from "./pages/TemplatesPage";
import FeaturesPage from "./pages/FeaturesPage";

/* COMPONENTS */

import TemplateForm from "./components/Templates/TemplateForm";

import QRGenerator from "./components/QRGenerator/QRGenerator";

import EmailTemplate from "./components/Templates/EmailTemplate";

import PhotoTemplate from "./components/Templates/PhotoTemplate";

import AudioTemplate from "./components/Templates/AudioTemplate";

const RoutesComponent = () => {

return(

<Routes>

{/* HOME */}

<Route
path="/"
element={<Home/>}
/>


{/* LOGIN */}

<Route
path="/login"
element={<LoginPage/>}
/>


{/* SIGNUP */}

<Route
path="/signup"
element={<SignupPage/>}
/>


{/* PRICING */}

<Route
path="/pricing"
element={<PricingPage/>}
/>


{/* DASHBOARD */}

<Route
path="/dashboard"
element={<DashboardPage/>}
/>


{/* FEATURES */}

<Route
path="/features"
element={<FeaturesPage/>}
/>


{/* TEMPLATES */}

<Route
path="/templates"
element={<TemplatesPage/>}
/>


{/* TEMPLATE FORM */}

<Route
path="/template-form"
element={<TemplateForm/>}
/>


{/* EMAIL TEMPLATE */}

<Route
path="/email-template"
element={<EmailTemplate/>}
/>


{/* PHOTO TEMPLATE */}

<Route
path="/photo-template"
element={<PhotoTemplate/>}
/>


{/* AUDIO TEMPLATE */}

<Route
path="/audio-template"
element={<AudioTemplate/>}
/>


{/* QR GENERATOR */}

<Route
path="/qr-generator"
element={<QRGenerator/>}
/>

</Routes>

);

};

export default RoutesComponent;