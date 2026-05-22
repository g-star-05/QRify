import Navbar
from "../components/Navbar/Navbar";

import Hero
from "../components/Hero/Hero";

import QRGenerator
from "../components/QRGenerator/QRGenerator";

import Features
from "../components/Features/Features";

import Templates
from "../components/Templates/Templates";

import Footer
from "../components/Footer/Footer";


const Home = () => {

return(

<>

<Navbar />


{/* HERO */}

<Hero />


{/* QR GENERATOR */}

<QRGenerator />


{/* FEATURES */}

<Features />


{/* TEMPLATES */}

<Templates />


{/* FOOTER */}

<Footer />

</>

);

};

export default Home;