import styles from "@/styles/About.module.css";
import personalPic from "@/assets/images/personal-pic.jpeg";

const About = () => {
  return (
    <article className={styles.main}>
      <div className={styles.picBox}>
        <img
          className={styles.personalPic}
          src={personalPic}
          alt="Ahmed - Frontend Developer profile photo"
        />
      </div>
      <div>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.paragraph}>
          Hi, I'm Ahmed, a frontend developer focused on building responsive and
          user-friendly web interfaces.
        </p>

        <p className={styles.paragraph}>
          I enjoy turning ideas into clean, interactive experiences using HTML,
          CSS, Javascript, and React.
        </p>
        <p className={styles.paragraph}>
          I'm currently deepening my frontend skills and building projects to
          strengthen both UI design and real-world development.
        </p>
        <h2 className={styles.title}>About This Website</h2>
        <p className={styles.paragraph}>
          This project showcases my skills and abilities as a frontend
          developer.
        </p>
        <p className={styles.paragraph}>
          I built it to practice responsive design, component structure, and
          deployment with{" "}
          <a
            href="https://docs.github.com/en/pages"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Pages
          </a>
        </p>
        <p className={styles.paragraph}>
          The goal was to create a clean and accessible experience across
          desktop and mobile.
        </p>
      </div>
    </article>
  );
};

export default About;
