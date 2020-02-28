import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Alphapicker.scss";

const PickList = ({ picks, pickFunc, picked }) =>
  picks.map(pick => (
    <li key={pick} className="page-item">
      <button
        onClick={() => pickFunc(pick)}
        className={`page-link ${picked === pick ? "picked" : ""}`}
      >
        {pick}
      </button>
    </li>
  ));

const Alphapicker = ({ picks, pickFunc }) => {
  const [picked, setPicked] = useState(null);

  const handlePick = pick => {
    setPicked(pick);
    pickFunc({ name: pick });
  };

  return (
    <nav aria-label="Alphapicker">
      <ul className="pagination">
        <li key="all" className="page-item">
          <button onClick={() => handlePick(null)} className="page-link">
            All
          </button>
        </li>
        <PickList pickFunc={handlePick} picked={picked} picks={picks} />
      </ul>
    </nav>
  );
};

Alphapicker.propTypes = {
  filter: PropTypes.arrayOf(),
  pickFunc: PropTypes.func.isRequired
};

export default Alphapicker;
