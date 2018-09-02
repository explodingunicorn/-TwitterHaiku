import React from "react";
import Haiku from "components/haiku";
import { Row, Column } from "components/layout";

const HaikuCollection = ({ data }) => {
  return (
    <Row>
      {data.haikus
        ? data.haikus.map((haiku, i) => (
            <Column key={i} lg={4}>
              <Haiku haikuObj={haiku} />
            </Column>
          ))
        : null}
    </Row>
  );
};

export default HaikuCollection;
