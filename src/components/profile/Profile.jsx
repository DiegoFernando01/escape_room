import styles from "./Profile.module.css";

const Profile = ({ picture, name, email }) => {
  return (
    <div className={styles.container}>
      <section className="header">
        <div className="contentImg">
          <img src={picture} />
        </div>
        <span>{name}</span>
      </section>
      <section className="footer">
        <div className="content">
          <span>{email}</span>
        </div>
      </section>
      <div className="logo">
        <img src={picture} className="logo" alt="Logo" />
      </div>
    </div>
  );
};

export default Profile;
