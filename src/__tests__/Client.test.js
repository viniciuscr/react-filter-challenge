import React from "react";
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Client from "../components/client";

configure({ adapter: new Adapter() });

describe("Client tests", () => {
  const clientData = {
    name: "My Realty",
    id: "236244",
    products: [
      {
        product_handle: "lead_management",
        state: "active"
      },
      {
        product_handle: "dashboard",
        state: "canceled"
      }
    ]
  };

  it("should render as expected", () => {
    const wrapper = mount(<Client>{clientData}</Client>);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
