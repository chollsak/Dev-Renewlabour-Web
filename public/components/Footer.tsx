import React from 'react';

const Footer: React.FC = () => {

  const FontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
  };  


  return (
    <footer style={{ ...footerStyle}}>
      <div style={innerDivStyle}>
      {new Date().getFullYear()}<p style={textStyle}>© <span style={FontStyle}>Renewlabour. All rights reserved.</span> </p>
      </div>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  color: 'black',
  textAlign: 'center',
  padding: '1rem',
};

const innerDivStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const textStyle: React.CSSProperties = {
  margin: 0,
};

export default Footer;
