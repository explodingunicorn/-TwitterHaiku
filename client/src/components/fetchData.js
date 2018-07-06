import React from "react";

export default (RenderComponent, dataFunction) => {
  return class extends React.Component {
    state = {
      data: ""
    };

    async componentDidMount() {
      const data = await dataFunction();
      console.log(data);
      this.setState({ data });
    }

    render() {
      return <RenderComponent data={this.state.data} />;
    }
  };
};
