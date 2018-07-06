import React from "react";
import Haiku from "components/haiku";
import { Row, Column } from "components/layout";

const HaikuCollection = ({ haikus }) => {
  return (
    <Row>
      {haikus.map(haiku => (
        <Column lg={4}>
          <Haiku haikuObj={haiku} />
        </Column>
      ))}
    </Row>
  );
};

export default HaikuCollection;
