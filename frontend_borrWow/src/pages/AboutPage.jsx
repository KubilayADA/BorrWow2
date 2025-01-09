// AboutPage.jsx
import React from "react";
import styles from "../styles/AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to BorrWow!</h1>
      <p className={styles.description}>
        At BorrWow, we're on a mission to create a community where sharing is at
        the heart of everything. Our platform allows you to lend out items you
        no longer need and borrow items that you do. Whether it's a power drill
        you use once a year or a camping tent you need for a weekend trip,
        BorrWow makes it easy to connect with others who have what you're
        looking for.
      </p>
      <h2 className={styles.sectionTitle}>How It Works</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong>List Items:</strong> Simply list items you have available for
          borrowing.
        </li>
        <li className={styles.listItem}>
          <strong>Browse Items:</strong> Explore a wide range of items listed by
          others in the community.
        </li>
        <li className={styles.listItem}>
          <strong>Request to Borrow:</strong> Send a request to borrow the items
          you need.
        </li>
        <li className={styles.listItem}>
          <strong>Earn Trust Points:</strong> Build your reputation in the
          community by completing successful transactions.
        </li>
      </ul>
      <h2 className={styles.sectionTitle}>Why BorrWow?</h2>
      <p className={styles.description}>
        We believe in the power of community and the joy of sharing. By
        participating in BorrWow, you not only get access to a variety of items
        without the burden of ownership, but you also contribute to a culture of
        trust and collaboration. Plus, earning trust points adds a rewarding
        layer to your interactions.
      </p>
      <h2 className={styles.sectionTitle}>Join Us!</h2>
      <p className={styles.description}>
        Ready to be part of a community that values sharing? Sign up today and
        start lending and borrowing with ease. At BorrWow, your next great find
        is just a click away!
      </p>
    </div>
  );
};

export default AboutPage;
