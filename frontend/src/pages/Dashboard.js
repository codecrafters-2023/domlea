// import Banner from "../components/Banner";
import FAQ from "../components/Faq";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Header from "../components/Navbar";
import PremiumDomains from "../components/PremiumDomain/PremiumDomain";
// import DomainSearch from "../components/SearchDomain";
// import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
// import TrendingDomians from "../components/TrendingDomains";
import ValueProposition from "../components/Whychooseus";

const Dashboard = () => {
    return (
        <>
        <Header/>
            <Hero/>
            {/* <TrendingDomians/> */}
            {/* <DomainSearch/> */}
            <PremiumDomains/>
            <ValueProposition/>
            <FAQ/>
            <Testimonials/>
            {/* <Banner/> */}
            {/* <Pricing/> */}
            {/* <BlogSection/> */}
            <Footer/>
        </>
        
    );
};

export default Dashboard;