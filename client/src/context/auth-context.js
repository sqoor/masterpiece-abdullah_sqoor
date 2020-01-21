import React from "react";

const authContext = React.createContext({
  authenticiated: false,
  login: () => {}
});

export default authContext;
