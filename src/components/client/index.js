import React from "react";
import "./Client.scss";

const Badge = ({ state }) => <span className={`badge ${state}`}>{state}</span>;

const ListProducts = ({ products }) => (
  <ul className="producsts">
    {products.map(({ product_handle, state }) => (
      <li key={product_handle}>
        <Badge state={state} /> {product_handle}
      </li>
    ))}
  </ul>
);

const Client = ({ children: { name, id, products } }) => {
  return (
    <div className="shadow-sm h-100  mb-2 border bg-white rounded-sm ">
      <div className="client-box">
        <div className="container-fluid">
          <h4>
            {name} <small className="text-muted">{id}</small>
          </h4>
          <ListProducts products={products} />
        </div>

        <button className="bt-foward">
          <span className="icon-rl-forward" />
        </button>
      </div>
    </div>
  );
};

export default Client;
