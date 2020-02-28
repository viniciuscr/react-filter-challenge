import React from "react";
import "./ClientList.scss";
import Client from "../client";

const ClientList = ({ clients }) => {
  return (
    <div>
      {clients.map(client => (
        <Client key={client.id}>{client}</Client>
      ))}
    </div>
  );
};

export default ClientList;
