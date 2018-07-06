import React, { Component } from "react";
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
      <div>
        <h1>User Page id: {this.props.match.params.id}</h1>
        <div className="main-container">
          <HaikuCollection haikus={user.haikus || []} />
        </div>
      </div>
    );
  }
}

export default User;
