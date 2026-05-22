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

import TemplateForm
from "./components/Templates/TemplateForm";

import QRGenerator
from "./components/QRGenerator/QRGenerator";


const RoutesComponent = () => {

  return (

    <Routes>

      {/* HOME */}

      <Route

        path="/"

        element={
          <Home />
        }

      />


      {/* LOGIN */}

      <Route

        path="/login"

        element={
          <LoginPage />
        }

      />


      {/* SIGNUP */}

      <Route

        path="/signup"

        element={
          <SignupPage />
        }

      />


      {/* PRICING */}

      <Route

        path="/pricing"

        element={
          <PricingPage />
        }

      />


      {/* DASHBOARD */}

      <Route

        path="/dashboard"

        element={
          <DashboardPage />
        }

      />


      {/* TEMPLATES */}

      <Route

        path="/templates"

        element={
          <TemplatesPage />
        }

      />


      {/* FEATURES */}

      <Route

        path="/features"

        element={
          <FeaturesPage />
        }

      />


      {/* TEMPLATE FORM */}

      <Route

        path="/template-form"

        element={
          <TemplateForm />
        }

      />


      {/* QR GENERATOR */}

      <Route

        path="/qr-generator"

        element={
          <QRGenerator />
        }

      />

    </Routes>

  );

};

export default RoutesComponent;