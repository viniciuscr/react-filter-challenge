import React from "react";
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FilterSection from "../components/filterSection";

configure({ adapter: new Adapter() });

describe("FilterSection tests", () => {
  it("should render as expected", () => {
    const wrapper = mount(
      <FilterSection
        title="Section Test"
        options={["option", "option two", "option three"]}
        filterFunc={jest.fn()}
      />
    );
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it("should call filterFunc when a item is clicked", () => {
    const filterFunc = jest.fn();
    const wrapper = mount(
      <FilterSection
        title="Section"
        options={["option", "option two", "option three"]}
        filterFunc={filterFunc}
      />
    );

    const option = wrapper.find("Filter").find("#Section-option");
    option.simulate("change");

    expect(filterFunc).toHaveBeenCalled();

    wrapper.unmount();
  });
});
