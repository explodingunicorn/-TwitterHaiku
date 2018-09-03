import React from "react";
import styled from "react-emotion";
import { css } from "emotion";

const Row = styled("div")`
  align-items: ${props => props.align + "!important" || "flex-start"};
  box-sizing: border-box;
  display: flex;
  flex-basis: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: ${props => props.justify || "left"};
  margin-bottom: ${props => (!props.noMgn ? "20px" : 0)};
  width: 100%;
  > * {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
  }
`;

const getWidth = number => {
  return `${(number / 12) * 100}%`;
};

const Column = styled("div")`
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  justify-content: ${props => props.justify || "left"};
  padding: 15px;
  width: ${props => getWidth(props.lg)};

  @media (max-width: 1224px) {
    width: ${props => (props.md ? getWidth(props.md) : getWidth(props.lg))};
  }

  @media (max-width: 768px) {
    width: ${props => {
      return props.sm
        ? getWidth(props.sm)
        : props.md
          ? getWidth(props.md)
          : getWidth(props.lg);
    }};
  }
`;

const Container = styled("div")`
  display: block;
  margin: 0 auto;
  width: ${props => (props.lg ? props.lg : 100)}%;

  @media (max-width: 1224px) {
    width: ${props => (props.md ? props.md : props.lg)}%;
  }

  @media (max-width: 768px) {
    width: ${props => {
      return props.sm ? props.sm : props.md ? props.md : props.lg;
    }}%;
  }
`;

const Spacer = styled("div")`
  display: flex;
  flex: 1;
`;

export { Container, Row, Column, Spacer };
