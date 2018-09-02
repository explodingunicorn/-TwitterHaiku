import React from "react";

export default (RenderComponent, dataFunction, giveDataAs) => {
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
      const propsObj = {};
      if (giveDataAs) {
        propsObj[giveDataAs] = this.state.data;
      } else {
        propsObj.data = this.state.data;
      }
      return <RenderComponent {...propsObj} />;
    }
  };
};
