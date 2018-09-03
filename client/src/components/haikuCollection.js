import React from "react";
import Haiku from "components/haiku";
import { Row, Column } from "components/layout";

const HaikuCollection = ({ data }) => {
  const renderPlaceholderHaikus = () => {
    const haikus = [];
    for (let i = 0; i < 9; i++) {
      haikus.push(
        <Column key={i} lg={4}>
          <Haiku haikuObj={{}} />
        </Column>
      );
    }
    return haikus;
  };

  return (
    <Row>
      {data.haikus
        ? data.haikus.map((haiku, i) => (
            <Column key={i} lg={4}>
              <Haiku haikuObj={haiku} />
            </Column>
          ))
        : renderPlaceholderHaikus()}
    </Row>
  );
};

export default HaikuCollection;
