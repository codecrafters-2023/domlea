// // ValueProposition.jsx
// import React from 'react';
// import './ValueProposition.css';

// const ValueProposition = () => {
//     const features = [
//         {
//             icon: '🚀',
//             title: 'Instant Domain Activation',
//             description: 'Get your domain live within minutes of purchase with our seamless integration system'
//         },
//         {
//             icon: '🛡️',
//             title: 'Advanced Security',
//             description: 'Free WHOIS privacy protection and SSL certification included with every domain'
//         },
//         {
//             icon: '💸',
//             title: 'Competitive Pricing',
//             description: 'Price match guarantee with transparent, no-hidden-fee structure'
//         },
//         {
//             icon: '🌍',
//             title: 'Global Network',
//             description: '24/7 support with data centers in 15+ countries worldwide'
//         },
//         {
//             icon: '🔄',
//             title: 'Easy Transfers',
//             description: 'Free domain transfers with our automated migration tools'
//         },
//         {
//             icon: '📈',
//             title: 'Growth Tools',
//             description: 'Free DNS management and integration with popular platforms'
//         }
//     ];

//     return (
//         <section className="value-proposition">
//             <div className="vp-container">
//                 <div className="vp-header">
//                     <h2>Why Choose Domlea?</h2>
//                     <p className="vp-subtitle">The smart choice for your digital presence</p>
//                 </div>

//                 <div className="vp-grid">
//                     {features.map((feature, index) => (
//                         <div className="vp-card" key={index}>
//                             <div className="vp-icon">{feature.icon}</div>
//                             <h3>{feature.title}</h3>
//                             <p>{feature.description}</p>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="vp-stats">
//                     <div className="stat-item">
//                         <div className="stat-number">500K+</div>
//                         <div className="stat-label">Domains Managed</div>
//                     </div>
//                     <div className="stat-item">
//                         <div className="stat-number">99.9%</div>
//                         <div className="stat-label">Uptime Guarantee</div>
//                     </div>
//                     <div className="stat-item">
//                         <div className="stat-number">24/7</div>
//                         <div className="stat-label">Support Coverage</div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ValueProposition;

import React from "react";
import "./ValueProposition.css";
import { FaDatabase, FaServer, FaCloud, FaHeadset } from "react-icons/fa";

const ValueProposition = () => {
    const services = [
        {
            icon: '🚀',
            title: 'Instant Domain Activation',
            description: 'Get your domain live within minutes of purchase with our seamless integration system'
        },
        {
            icon: '🔄',
            title: 'Easy Transfers',
            description: 'Free domain transfers with our automated migration tools'
        },
        {
            icon: '💸',
            title: 'Competitive Pricing',
            description: 'Price match guarantee with transparent, no-hidden-fee structure'
        },
        {
            icon: '🛡️',
            title: 'Advanced Security',
            description: 'Free WHOIS privacy protection and SSL certification included with every domain'
        },
    ];

    return (
        <div className="why-choose-us">
            <h2>Why Choose Us</h2>
            {/* <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua.
            </p> */}
            <div className="service-container">
                {services.map((service, index) => (
                    <div className="service-box" key={index}>
                        <div className="icon">{service.icon}</div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ValueProposition;
