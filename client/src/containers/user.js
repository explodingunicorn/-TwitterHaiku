import React, { Component } from "react";
import { Container, Row, Column } from 'components/layout';
import UserInfo from 'components/userInfo';
import HaikuCollection from "components/haikuCollection";
import requests from "requests";

console.log(HaikuCollection);

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    this.getUserData(this.props.match.params.id);
  }

  componentWillReceiveProps(props) {
    this.getUserData(props.match.params.id);
  }

  async getUserData(userId) {
    const { user } = await requests.user.get.all(userId);
    this.setState({ user });
  }

  render() {
    const user = this.state.user;
    console.log(user);
    return (
      <Container lg={85}>
        <Row>
          <Column lg={3}>
            <UserInfo data={user}/>
          </Column>
          <Column lg={9}>
            <HaikuCollection haikus={user.haikus || []} />
          </Column>
        </Row>
      </Container>
    );
  }
}

export default User;
