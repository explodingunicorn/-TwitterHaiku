import React from "react";
import styled from "react-emotion";
import { css } from "emotion";

const rowClass = css({
  boxSizing: "border-box",
  display: "flex",
  flexBasis: "100%",
  flexWrap: "wrap",
  flexDirection: "row",
  marginBottom: "20px",
  width: "100%"
});

const Row = props => {
  return (
    <div className={`${rowClass} ${props.className}`}>{props.children}</div>
  );
};

const Column = props => {
  const getWidth = number => {
    return `${(number / 12) * 100}%`;
  };

  const columnClass = css({
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "column",
    padding: "15px",
    width: `${getWidth(props.lg)}`,

    "@media (max-width: 1224px)": {
      width: props.md ? `${getWidth(props.md)}` : `${getWidth(props.lg)}`
    },

    "@media (max-width: 768px)": {
      width: props.sm
        ? `${getWidth(props.sm)}`
        : props.md
          ? `${getWidth(props.md)}`
          : `${getWidth(props.lg)}`
    }
  });

  return (
    <div className={`${columnClass} ${props.className}`}>{props.children}</div>
  );
};

const Container = props => {
  const containerClass = css({
    display: "block",
    margin: "0 auto",
    width: `${props.lg ? props.lg : 100}%`,

    "@media (max-width: 1224px)": {
      width: props.md ? `${props.md}%` : `${props.lg}%`
    },

    "@media (max-width: 768px)": {
      width: props.sm
        ? `${props.sm}%`
        : props.md
          ? `${props.md}%`
          : `${props.lg}%`
    }
  });

  return (
    <div className={`${containerClass} ${props.className}`}>
      {props.children}
    </div>
  );
};

const Spacer = styled("div")`
  flex: 1;
`;

export { Container, Row, Column, Spacer };
