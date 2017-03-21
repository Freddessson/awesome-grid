import React from "react";

import Header from "./Header";
import Grid from "./Grid";


export default class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />
        <Grid />
      </div>
    );
  }
}
