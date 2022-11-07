import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="about">
      <h2 className="info">
        This project has been created to gain some confidence in React skills.
      </h2>
      <p className="author">
        Author : <span className="name"> Nijat Niyazov</span>
      </p>
      <a
        href="https://github.com/nidzhat-2000"
        target="_blank"
        className="github"
      >
        Check my github profile here...
      </a>
    </div>
  );
}

export default About;
