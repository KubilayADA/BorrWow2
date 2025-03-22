import React, { useContext, useState, useEffect } from "react";
import { Container, Text, Center, Button, Image, CopyButton, Tooltip } from "@mantine/core";
import styles from "../styles/InviteFriends.module.css";
import rewardImage from "../assets/images/ask.png";
import { SessionContext } from "../contexts/SessionContext";

function InviteFriends() {
  const { isAuthenticated, userId, token } = useContext(SessionContext);
  const [invitationCode, setInvitationCode] = useState("");
  const [loadingCode, setLoadingCode] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && userId && token)  {
      const fetchInvitationCode = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/${userId}/invite-code`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 400) {
            throw new Error ("Invitatation feature not available");
          }

          if (!response.ok) {
            const errorData = await response.json()
          }
          if (!response.ok) throw new Error("Failed to fetch invitation code");
          const data = await response.json();
          setInvitationCode(data.code);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoadingCode(false);
        }
      };
      fetchInvitationCode();
    }
  }, [isAuthenticated, userId, token]);

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationCode);
  };

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
              Get €30 BorrWower Cash for each friend that joins! Each friend also gets 1 month free.
            </Text>
          </div>

          {isAuthenticated ? (
            <>
              <Text align="center" className={styles.instructionText}>
                Share your unique referral code with friends:
              </Text>

              {loadingCode ? (
                <Text align="center">Loading invitation code...</Text>
              ) : error ? (
                <Text color="red" align="center">{error}</Text>
              ) : (
                <div className={styles.codeSection}>
                  <Tooltip label="Click to copy" withArrow>
                    <CopyButton value={invitationCode}>
                      {({ copied, copy }) => (
                        <Button 
                          onClick={() => {
                            copy();
                            handleCopy();
                          }}
                          variant="outline"
                          className={styles.codeButton}
                        >
                          {copied ? "Copied!" : invitationCode}
                        </Button>
                      )}
                    </CopyButton>
                  </Tooltip>
                  <Text align="center" className={styles.referralLink}>
                    Or share this link: {window.location.origin}/signup?ref={invitationCode}
                  </Text>
                </div>
              )}
            </>
          ) : (
            <>
              <Text align="center" className={styles.instructionText}>
                Login to get your unique referral code and start earning rewards!
              </Text>
              <div className={styles.actionButton}>
                <Button component="a" href="/login" className={styles.button}>
                  LOGIN NOW TO INVITE
                </Button>
              </div>
            </>
          )}

          <Text align="center" className={styles.disclaimer}>
            *Terms and conditions apply. Referral rewards may vary.
          </Text>
        </div>
      </Center>
    </Container>
  );
}

export default InviteFriends;