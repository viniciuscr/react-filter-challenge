import React from "react";
import PropTypes from "prop-types";
import Collapsible from "react-collapsible";
import "./FilterSection.scss";

const handleOnChange = (evt, filterFunc, type) =>
  filterFunc({
    [type.toLowerCase()]: {
      name: evt.target.value,
      status: evt.currentTarget.checked
    }
  });

const Filter = ({ type, options, filterFunc }) => (
  <ul>
    {options.map(option => (
      <li key={option}>
        <div className="bg-gray p-1 text-dark  rounded">
          <input
            name={option}
            onChange={evt => handleOnChange(evt, filterFunc, type)}
            type="checkbox"
            value={option}
            id={`${type}-${option}`}
          />
          <label htmlFor={`${type}${option}`}>{option}</label>
        </div>
      </li>
    ))}
  </ul>
);
const Title = ({ text }) => (
  <div className="d-flex justify-content-between mt-1 mb-1 mr-1 ">
    <h6>{text}</h6>
    <span className="icon-rl-chevron" />
  </div>
);

const FilterSection = ({ title, options, filterFunc }) => {
  return (
    <Collapsible key={title} open trigger={<Title text={title} />}>
      <Filter type={title} filterFunc={filterFunc} options={options} />
    </Collapsible>
  );
};

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  filterFunc: PropTypes.func.isRequired
};

export default FilterSection;
