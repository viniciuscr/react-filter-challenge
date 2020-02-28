import React from "react";
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ClientList from "../components/clientList";

configure({ adapter: new Adapter() });

describe("Client tests", () => {
  const clientsData = [
    {
      name: "no products",
      id: "5633",
      products: []
    },
    {
      name: "Addf gsd df",
      id: "3423",
      products: [
        {
          product_handle: "lead_management_",
          state: "paused"
        }
      ]
    },
    {
      name: "Pri porter",
      id: "333",
      products: [
        {
          product_handle: "lead_management",
          state: "active"
        },
        {
          product_handle: "marco_polo",
          state: "active"
        }
      ]
    },
    {
      name: "Pitter Bitter",
      id: "3434",
      products: [
        {
          product_handle: "dashboard",
          state: "canceled"
        }
      ]
    }
  ];

  it("should render as expected", () => {
    const wrapper = mount(<ClientList clients={clientsData} />);
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });
});
