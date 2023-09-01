import React from "react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <p>&copy;{currentYear} Fitness Tracker</p>
      <p>
        Developers:
        <a className="developers" target="_blank">
          Drew, Eduardo, Dominque & Harshil
        </a>
      </p>
    </div>
  );
};
export default Footer;
