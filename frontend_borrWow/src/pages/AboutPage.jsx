import React from "react";
import styles from "../styles/AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Welcome to BorrWow!</h1>
      <p className={styles.description}>
        At <strong>BorrWow</strong>, we're on a mission to foster a vibrant, sustainable, and resourceful community where sharing is the cornerstone of everything we do. Our platform enables individuals to lend out items they no longer use and borrow items they need, empowering people to make the most of the resources available to them—without the need for ownership. Whether it’s a high-end power drill gathering dust in your garage or a camping tent you need for a weekend adventure, <strong>BorrWow</strong> connects you with your neighbors and fellow community members who can lend you what you need.
      </p>
      
      <h2 className={styles.sectionTitle}>Why Choose BorrWow?</h2>
      <p className={styles.description}>
        Our philosophy is simple: <strong>Share what you have, borrow what you need, and help build a community rooted in trust and generosity.</strong> By joining <strong>BorrWow</strong>, you gain access to an ever-growing network of users offering items ranging from everyday tools and appliances to specialized equipment and recreational gear. Rather than investing in something you’ll only use occasionally, you can borrow it when needed and return it when done. In turn, you contribute to the circular economy, reduce waste, and help others save money by sharing resources.
      </p>
      <p className={styles.description}>
        Moreover, by lending items on <strong>BorrWow</strong>, you’re making use of things you may not always need, helping others while earning <strong>Trust Points</strong> for each successful transaction. This system rewards you for being an active and responsible member of our community.
      </p>

      <h2 className={styles.sectionTitle}>How It Works</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong>List Items:</strong> Got a few things gathering dust? It’s time to turn them into useful resources for others! Listing an item is simple—just provide a title, description, and a clear image. You can set your own lending terms and availability. You’re in full control of who borrows your items and when.
        </li>
        <li className={styles.listItem}>
          <strong>Browse Items:</strong> Looking for something specific? With thousands of items listed by fellow users, browsing for the things you need has never been easier. Search by category, location, or item name to find what you’re looking for, whether it’s a power tool, a bicycle, or even a home theater system.
        </li>
        <li className={styles.listItem}>
          <strong>Request to Borrow:</strong> Once you find the item you need, simply send a borrowing request. You’ll be able to communicate with the lender to confirm the details, including the time period for borrowing, pick-up and drop-off instructions, and any special requirements for using the item.
        </li>
        <li className={styles.listItem}>
          <strong>Earn Trust Points:</strong> Building trust is at the heart of <strong>BorrWow</strong>. Each successful transaction you complete (whether lending or borrowing) earns you <strong>Trust Points</strong>, which help establish your reputation in the community. The more points you earn, the more credible and trusted you become. This system ensures that users feel confident in the security and reliability of those they’re lending to or borrowing from.
        </li>
      </ul>

      <h2 className={styles.sectionTitle}>Why BorrWow Is Different</h2>
      <p className={styles.description}>
        At <strong>BorrWow</strong>, we believe in <strong>collaboration over ownership.</strong> By encouraging people to share and borrow items instead of purchasing new ones, we aim to reduce consumer waste, minimize unnecessary spending, and build stronger community bonds.
      </p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong>Sustainable Living:</strong> Every time you borrow an item instead of buying one, you’re reducing your carbon footprint. This helps lessen demand for manufacturing, shipping, and packaging of new products, which are major contributors to environmental pollution. By adopting a sharing economy, you become part of a movement toward a greener planet.
        </li>
        <li className={styles.listItem}>
          <strong>Access Without Ownership:</strong> Not everyone needs to own every tool or piece of equipment. <strong>BorrWow</strong> gives you access to high-quality items you might use just once or twice a year, making your life more convenient and your home less cluttered. Think about the benefits of being able to borrow camping gear, a power washer, or even a party tent without the hassle of storage.
        </li>
        <li className={styles.listItem}>
          <strong>Community-Driven Support:</strong> When you borrow from <strong>BorrWow</strong>, you’re not just borrowing from any random person—you’re borrowing from people in your community. The feedback system and the Trust Points feature ensure that everyone follows the community guidelines, and if you ever need help or have an issue, we’re here to support you.
        </li>
        <li className={styles.listItem}>
          <strong>Cost Savings:</strong> Renting from <strong>BorrWow</strong> allows you to save money on items you may not want to buy. Whether it’s for a special occasion or just a one-time need, our platform offers a more affordable way to access what you need without committing to a full purchase.
        </li>
      </ul>

      <h2 className={styles.sectionTitle}>Join Us!</h2>
      <p className={styles.description}>
        Ready to start sharing and borrowing with ease? Join <strong>BorrWow</strong> and be part of a growing community of people who value collaboration, trust, and sustainability. Whether you’re looking to lend out some unused items or borrow something for a project or event, you’re in the right place.
      </p>
      <p className={styles.description}>
        <strong>Sign up today</strong>, start building your profile, and connect with your neighbors who are ready to share. Remember: at <strong>BorrWow</strong>, it’s not just about getting what you need; it’s about creating a culture of trust and shared resources for a brighter, more sustainable future.
      </p>
      <p className={styles.description}>
        Let’s build a world of shared experiences and endless possibilities—one item at a time.
      </p>
    </div>
  );
};

export default AboutPage;
