import React from "react";
import styled from "styled-components";

import Header from "components/Header";

const AppContainer = styled.div`
font-size: 0;
color: white;
`;

/**
 * Inventory frontend app. The entrypoint.
 */
export default function App() {
  return (
    <AppContainer>
      <Header />
    </AppContainer>
  );
}
