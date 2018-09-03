import React from "react";
import styled from "react-emotion";
import colors from "styles/colors";
import { Row, Spacer, Container, Column } from "components/layout";
import TextLoader from "components/textLoader";

const FixedBanner = styled("div")`
  align-items: center;
  background-color: white;
  box-shadow: ${colors.shadow};
  display: flex;
  height: 90px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`;

const UserPic = styled("img")`
  background-color: ${colors.lightGray};
  border: 3px solid ${colors.blue};
  border-radius: 50%;
  box-shadow: ${colors.shadow};
  height: 50px;
  margin-right: 15px;
  width: 50px;
`;

const UserInfo = styled("div")`
  margin-left: 30px;
  text-align: right;
  small {
    margin: 0;
    margin-bottom: 5px;
  }
  h4 {
    margin: 0;
  }
`;

class UserBanner extends React.Component {
  getSentimentString(score) {
    if (score > -1 && score < 1) return "Neutral";
    else if (score > 1 && score < 3) return "Positive";
    else if (score >= 3) return "Very Positive";
    else if (score < -1 && score > -3) return "Negative";
    else if (score <= -3) return "Very Negative";
  }
  render() {
    const user = this.props.user;
    return (
      <FixedBanner>
        <Container lg={65}>
          <Row align="center" noMgn={true}>
            <Column lg={6}>
              <Row align="center" noMgn>
                <UserPic src={user.pic || ""} />
                <h2>
                  <a href={"https://twitter.com/" + user.user} target="_blank">
                    @{this.props.userName || "Loading"}
                  </a>
                </h2>
              </Row>
            </Column>
            <Column lg="6">
              <Row noMgn>
                <Spacer />
                <UserInfo>
                  <small>HAIKUS:</small>
                  {user.haikus ? (
                    <h4>{user.haikus}</h4>
                  ) : (
                    <TextLoader width={100} />
                  )}
                </UserInfo>
                <UserInfo>
                  <small>SENTIMENT:</small>
                  {user.averageHaikuSentiment ? (
                    <h4>
                      {this.getSentimentString(user.averageHaikuSentiment)}
                    </h4>
                  ) : (
                    <TextLoader width={100} noMgn />
                  )}
                </UserInfo>
              </Row>
            </Column>
          </Row>
        </Container>
      </FixedBanner>
    );
  }
}

export default UserBanner;
