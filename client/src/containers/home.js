import React from "react";
import fetchData from "components/fetchData";
import HaikuCollection from "components/haikuCollection";
import Input from "components/input";
import Button from "components/button";
import { Container, Row, Column, Spacer } from "components/layout";
import Request from "requests";

class Home extends React.Component {
  state = {
    user: ""
  };

  RecentHaikus = fetchData(HaikuCollection, Request.haikus.get);

  onUserInput = e => {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container lg={60}>
        <Row>
          <Spacer />
          <Column lg={8}>
            <h4>Enter a twitter username and hit go!</h4>
            <Row>
              <Input
                value={this.state.user}
                name="user"
                onChange={this.onUserInput}
              />
              <Button type="action" style={{ marginLeft: "10px" }}>
                Go!
              </Button>
            </Row>
          </Column>
          <Spacer />
        </Row>
        <Row>
          <h2>Recently found haikus</h2>
          <this.RecentHaikus />
          <HaikuCollection data={{}} />
        </Row>
      </Container>
    );
  }
}

export default Home;
