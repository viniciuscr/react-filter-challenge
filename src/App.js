import React, { Component } from "react";
import "./App.scss";
import "./rl-icon.scss";
import { Alphapicker, ClientList, Aside } from "./components";

const STATUS = ["Active", "Canceled", "Paused"];
const PRODUCTS = ["Lead Management", "Dashboard"];
const PICKS = [
  "#",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      //stores the original clients´ list from the api
      clients: [],
      //actual clients´ list showing to the user
      visibleClients: [],
      //filters that show on the sidebar it could by dynamic, accodirng to the list clients showing at the moment
      filters: [{ title: "Loading", options: ["loading"] }],
      //stores the filters applied by the user
      clientFilter: {
        name: null,
        products: [],
        status: []
      }
    };

    this.filterClients = this.filterClients.bind(this);
  }

  formatProduct = products =>
    products.map(product => {
      const p = product;
      p.product_handle = p.product_handle.split("_").join(" ");
      return p;
    });

  normalize(json) {
    return json.results.map(item => {
      const client = item.client;
      if (!client.id) client.id = client.gmaid;
      client.products = this.formatProduct(client.products);
      return client;
    });
  }

  updateClientFilter(name, status, products) {
    const statusUpdated = this.updateProductFilters(
      this.state.clientFilter.status,
      status
    );
    const productsUpdated = this.updateProductFilters(
      this.state.clientFilter.products,
      products
    );

    return {
      ...this.state.clientFilter,
      name: name !== undefined ? name : this.state.clientFilter.name,
      status: statusUpdated,
      products: productsUpdated
    };
  }

  updateProductFilters(actual, item) {
    if (!item) return actual;

    const { status, name } = item;
    const updated = actual;

    if (status) actual.push(name.toLowerCase());
    else updated.splice(updated.indexOf(name), 1);

    return updated;
  }

  filterClients({ name, status, products }) {
    const clientFilter = this.updateClientFilter(name, status, products);

    const filterByname = c =>
      clientFilter.name !== null
        ? clientFilter.name.length === 1
          ? c.name.toLowerCase().startsWith(clientFilter.name)
          : c.name.toLowerCase().indexOf(clientFilter.name) !== -1
        : true;

    const filterProducts = c =>
      clientFilter.products.length > 0
        ? c.products.filter(
            ({ product_handle }) =>
              clientFilter.products.indexOf(product_handle) !== -1
          )
        : c.products;

    const filterByState = products =>
      clientFilter.status.length > 0
        ? products.some(p => clientFilter.status.indexOf(p.state) !== -1)
        : products.length > 0; // if no state was selected we fallback to products matches

    const visibleClients = this.state.clients.filter(client => {
      const isNameMatch = filterByname(client);
      const products = filterProducts(client);
      const isProductsMatch = filterByState(products);

      return isNameMatch && isProductsMatch;
    });
    this.setState({ visibleClients, clientFilter });
  }

  componentDidMount() {
    //NOTE: data.json was moved to /public so we could emulate an api call
    fetch("./data.json").then(response =>
      response.json().then(json => {
        //NOTE: some clients have an "gmaid" instead of an "id" property.
        //Maybe it a good idea to spend some time here normalizing it before doing anything.
        //Also, we coould format the product_handle here too.
        const clients = this.normalize(json);

        this.setState({
          clients,
          visibleClients: clients,
          filters: [
            { title: "Products", options: PRODUCTS },
            { title: "Status", options: STATUS }
          ]
        });
      })
    );
  }

  render() {
    return (
      <div className="flex-body full-page">
        <header className="flex-header" />
        <div className="content-container row mt-5 m-0">
          <div className="flex-blank-content col-9">
            <Alphapicker pickFunc={this.filterClients} picks={PICKS} />
            <ClientList clients={this.state.visibleClients} />
          </div>
          <div className="col-3">
            <Aside
              filterFunc={this.filterClients}
              filters={this.state.filters}
            />
          </div>
        </div>
        <footer id="footer" className="flex-footer clearfix">
          <div className="footer-container-iq">
            <div className="copyright">
              SomeFake Co, Inc. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
