import React from "react";
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Alphapicker from "../components/alphapicker";

configure({ adapter: new Adapter() });

describe("Alphapicker tests", () => {});

it("should render as expected", () => {
  const wrapper = mount(
    <Alphapicker pickFunc={() => {}} picks={["b", "3", "bar"]} />
  );
  expect(wrapper.html()).toMatchSnapshot();
  wrapper.unmount();
});

it("should have the pick 'All' by default ", () => {
  const pickFunc = jest.fn();
  const wrapper = mount(
    <Alphapicker pickFunc={pickFunc} picks={["b", "3", "bar"]} />
  );

  expect(wrapper.findWhere(node => node.key() === "all").exists()).toBeTruthy();

  wrapper.unmount();
});

it("should call pickFunc when a pick is clicked", () => {
  const pickFunc = jest.fn();
  const wrapper = mount(
    <Alphapicker pickFunc={pickFunc} picks={["b", "3", "bar"]} />
  );
  wrapper
    .findWhere(node => node.key() === "bar")
    .find("button")
    .simulate("click");

  expect(pickFunc).toHaveBeenCalledWith({ name: "bar" });

  wrapper.unmount();
});

it("should call pickFunc with empty string and unselect any picked when clicked on All", () => {
  const pickFunc = jest.fn();
  const wrapper = mount(
    <Alphapicker pickFunc={pickFunc} picks={["b", "3", "bar"]} />
  );
  wrapper
    .findWhere(node => node.key() === "all")
    .find("button")
    .simulate("click");

  expect(pickFunc).toHaveBeenCalledWith({ name: null });
  expect(wrapper.html()).toMatchSnapshot();

  wrapper.unmount();
});
