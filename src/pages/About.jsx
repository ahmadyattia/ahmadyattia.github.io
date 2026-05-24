import styles from "@/styles/About.module.css";
import personalPic from "@/assets/images/personal-pic.jpeg";

const About = () => {
  return (
    <div className={styles.main}>
      <div className={styles.picBox}>
        <img
          className={styles.personalPic}
          src={personalPic}
          alt="Personal Picture"
        />
      </div>
      <h2>About Me</h2>
      <p>
        Hi, I'm Ahmed, a frontend developer focused on building responsive and
        user-friendly web interfaces.
      </p>

      <p>
        I enjoy turning ideas into clean, interactive experiences using HTML,
        CSS, Javascript, and React.
      </p>
      <p>
        I'm currently deepening my frontend skills and building projects to
        strengthen both UI design and real-world development.
      </p>
      <h2>About This Website</h2>
      <p>
        This project showcases my skills and abilities as a frontend developer.
      </p>
      <p>
        I built it to practice resposive design, component structure, and
        deployment with{" "}
        <a href="https://docs.github.com/en/pages" target="_blank">
          pages.github.com
        </a>
      </p>
      <p>
        The goal was to create a clean and accessible experience across desktop
        and mobile.
      </p>
    </div>
  );
};

export default About;
