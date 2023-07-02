import React from "react";
import Typewriter from "typewriter-effect";

const LandingPage = () => {
  return (
    <div>
      <header>
        <nav id="navbar">
          <div>
            <img src="Logo.jpg" alt="NgoLogo" className="ngo-logo" />
          </div>
          <div className="login-reg">
            <a href="">Login</a>
            <a href="">Register</a>
          </div>
        </nav>
      </header>
      <div class="MainTemplate">
        <div class="HeroSection">
          <div ID="FeatureText">
            <Typewriter
              options={{ loop: true, autoStart: true }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Canasu Dream Foundation")
                  .pauseFor(1000)
                  .deleteAll()
                  // .typeString("Graphic Designer")
                  // .pauseFor(1000)
                  // .deleteAll()
                  // .typeString("Ui/Ux Designer")
                  // .pauseFor(1000)
                  // .deleteAll()
                  // .typeString("Software Engineer")
                  // .pauseFor(1000)
                  // .deleteAll()
                  .start();
              }}
            />
          </div>
          <p class="HeaderText">Nuturing Dreams, Empowering Communities</p>
        </div>
        <div class="About">
          <div class="TextFeature">
            <h2 class="Title">About Us</h2>
            <p class="Paragraph">
              Canasu Dream Foundation is a nongovernmental organization founded
              in 2018, that empowers women through effective educational and
              livelihood initiatives. Through skill development, education and
              livelihood initiatives, We strengthen their inner voice by driving
              away their fear of suppression and by bringing freedom into every
              sphere of their lives.
            </p>
          </div>
          <div>
            <img id="AboutImage" src="AboutUs.png" />
          </div>
        </div>
        <div class="Projects">
          <div>
            <h2 class="Title">Projects</h2>
          </div>
          <div class="ProjectsCards">
            <div class="Stage">
              <p>
                Project Shiksha <br />
                <img id="StageImg" src="Project Shiksha.jpg" />
              </p>
            </div>
            <div class="Stage">
              <p>
                Project Udaan <br />
                <img id="StageImg" src="Project Udaan.jpg" />
              </p>
            </div>
            <div class="Stage">
              <p>
                Project Vridhi <br />
                <img id="StageImg" src="Project Vridhi.jpg" />
              </p>
            </div>
            <div class="Stage">
              <p>
                Project Empowher <br />
                <img id="StageImg" src="Empowher.jpg" />
              </p>
            </div>
          </div>
        </div>

        <section class="contact-section">
          <div class="container">
            <div class="contact-content">
              <h1>Contact Us</h1>
              <form class="contact-form">
                <div class="form-group">
                  <div class="column">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div class="column">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div class="form-group">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;