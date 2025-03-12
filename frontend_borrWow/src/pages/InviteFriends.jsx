import React from "react";
import { Container, Text, Center, Button, Image } from "@mantine/core";
import styles from "../styles/InviteFriends.module.css"; // Custom CSS file
import rewardImage from "../assets/images/ask.png"; 

function InviteFriends() {
  return (
    <Container className={styles.container}>
      <Center className={styles.center}>
        <div className={styles.content}>
          <Text align="center" className={styles.title}>
            <strong>Invite Your Friends & Get Rewarded</strong>
          </Text>

          <div className={styles.rewardSection}>
            <Image src={rewardImage} alt="Reward" className={styles.rewardImage} />
            <Text align="center" className={styles.rewardText}>
              Get €30 BorrWower Cash for each friend that joins! Each friend also gets 1 month free. It’s a win-win!
            </Text>
          </div>

          <Text align="center" className={styles.instructionText}>
             Share your unique referral link with friends, and they’ll get an exclusive 1-month free trial while you earn rewards. The more friends you invite, the more rewards you can unlock!
             
          </Text>

          <div className={styles.actionButton}>
            <Button component="a" href="/login" target="_blank" className={styles.button}>
             LOGIN NOW TO INVITE 
            </Button>
          </div>

          <Text align="center" className={styles.disclaimer}>
            *Terms and conditions apply. Referral rewards may vary.
          </Text>
        </div>
      </Center>
    </Container>
  );
}

export default InviteFriends;
