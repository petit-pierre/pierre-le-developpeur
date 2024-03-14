import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p></p>
      <div className="logos">
        <a
          href="https://github.com/petit-pierre"
          target="_blank"
          className="logoLink"
        >
          <img
            src="http://pierre-le-developpeur.com/assets/logo github.png"
            alt="logo github"
            className="logo"
          ></img>
        </a>
        <a
          href="https://www.linkedin.com/in/pierre-aubrée/"
          target="_blank"
          className="logoLink"
        >
          <img
            src="http://pierre-le-developpeur.com/assets/logo linkedin.png"
            alt="logo linkedin"
            className="logo"
          ></img>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
