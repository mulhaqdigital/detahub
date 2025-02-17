import React from 'react';
import './Partners.css';

const Partners = () => {
  const partners = [
    {
      name: "Google Cloud",
      logo: "/partners/google-cloud.svg",
      alt: "Google Cloud Logo"
    },
    {
      name: "Microsoft Azure",
      logo: "/partners/azure.svg",
      alt: "Microsoft Azure Logo"
    },
    {
      name: "Amazon Web Services",
      logo: "/partners/aws.svg",
      alt: "AWS Logo"
    },
    {
      name: "IBM",
      logo: "/partners/ibm.svg",
      alt: "IBM Logo"
    },
    {
      name: "Oracle",
      logo: "/partners/oracle.svg",
      alt: "Oracle Logo"
    },
    {
      name: "Salesforce",
      logo: "/partners/salesforce.svg",
      alt: "Salesforce Logo"
    },
    {
      name: "VMware",
      logo: "/partners/vmware.svg",
      alt: "VMware Logo"
    },
    {
      name: "Red Hat",
      logo: "/partners/redhat.svg",
      alt: "Red Hat Logo"
    },
    {
      name: "Docker",
      logo: "/partners/docker.svg",
      alt: "Docker Logo"
    },
    {
      name: "Kubernetes",
      logo: "/partners/kubernetes.svg",
      alt: "Kubernetes Logo"
    }
  ];

  return (
    <section className="partners-section">
      <h2>Our Technology Partners</h2>
      <div className="partners-grid">
        {partners.map((partner, index) => (
          <div key={index} className="partner-logo">
            <img 
              src={partner.logo} 
              alt={partner.alt}
              onError={(e) => {
                e.target.src = "/logo192.png"; // Fallback image
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners; 