import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about">
      <h2>
        This project is made in order to get some confidence in React skills
      </h2>
      <span>Author: Nijat Niyazov</span>
      {/* <Link to="https://mail.google.com/mail/u/0/" target="_blank">
        U can check my github here
      </Link> */}
    </div>
  );
}

export default About;
