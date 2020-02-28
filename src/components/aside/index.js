import React from "react";
import PropTypes from "prop-types";
import FilterSection from "../filterSection";
import "./Aside.scss";

const handleChangeSearch = (evt, filterFunc) =>
  filterFunc({
    name: evt.currentTarget.value !== "" ? evt.currentTarget.value : null
  });

const Search = ({ filterFunc }) => (
  <div className="search">
    <label htmlFor="search"><h6>Search</h6></label>
    <div className="input-group">
      <input
        onChange={evt => handleChangeSearch(evt, filterFunc)}
        type="search"
        className="form-control"
      />
      <div className="input-group-append">
        <span className="input-group-text icon-rl-search" />
      </div>
    </div>
  </div>
);

const Aside = ({ filters, filterFunc }) => {
  return (
    <aside>
      <Search filterFunc={filterFunc} />
      {filters.map(({ title, options }) => (
        <FilterSection
          title={title}
          options={options}
          filterFunc={filterFunc}
        />
      ))}
    </aside>
  );
};

Aside.propTypes = {
  filter: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      option: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    }).isRequired
  ),
  filterFunc: PropTypes.func.isRequired
};

export default Aside;
