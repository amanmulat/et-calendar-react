import React from "react";

const Lang = ({ en, am, selectedLang }) => {
  return <div>{selectedLang === "am" ? am : en}</div>;
};

export default Lang;
