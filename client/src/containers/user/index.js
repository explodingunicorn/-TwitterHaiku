import React, { Component } from "react";
import { Container, Row, Column } from "components/layout";
import UserInfo from "components/userInfo";
import HaikuCollection from "components/haikuCollection";
import UserBanner from "./banner";
import requests from "requests";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      haikus: []
    };
  }

  componentDidMount() {
    this.getUserData(this.props.match.params.id);
  }

  componentWillReceiveProps(props) {
    this.getUserData(props.match.params.id);
  }

  async getUserData(userId) {
    const response = await requests.haikus.get("user", userId);
    console.log('response recieved');
    if (response.haikus) {
      const { user, haikus } = response;
      this.setState({ user, haikus });
    }
  }

  render() {
    const { user, haikus } = this.state;
    const data = haikus.length > 0 ? { haikus } : {};
    return (
      <Container style={{ paddingTop: "120px" }} lg={65}>
        {/* <UserBanner user={user} userName={this.props.match.params.id} /> */}
        <Row>
          <HaikuCollection data={data} />
        </Row>
      </Container>
    );
  }
}

export default User;
