import React from "react";

const About = () => {
  return (
    <div>
      <div className="container flex items-center justify-center text-center my-10">
       <h2><strong>Welcome to iNotebook</strong></h2> <h3> Your ultimate digital companion for secure and
        effortless note-taking.Whether you're jotting down a quick idea,
        organizing your daily tasks, or planning your next big project,
        iNotebook is here to make the process seamless and efficient.</h3>
      </div>
      <div className="container flex items-center justify-center text-center" style={{marginTop: '70px'}}>
        <h2><strong>
          Why Choose iNotebook?
          </strong>
          </h2>
          <li>
            <h3>Secure by Design: Your notes are encrypted and stored securely,
            ensuring your thoughts remain private and protected.</h3>
          </li>
          <li>
            <h3>Effortless Experience: With an intuitive interface, iNotebook makes
            note-taking and organizing simple and enjoyable.</h3>
          </li>
          <li>
            <h3>
            Free for Everyone: Start capturing your ideas without worrying about
            hidden costs.
            </h3>
          </li>
      </div>
    </div>
  );
};

export default About;
