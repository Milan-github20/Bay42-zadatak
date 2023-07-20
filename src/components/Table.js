import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "./Table.css";
import { format } from "date-fns";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = (props) => {
  const [rowData, setRowData] = useState([]);

  //useEffect koji transformiše JSON podatke i smješta ih u redove, ponovo će se pokrenuti tek kada se izmjeni JSON.

  useEffect(() => {
    const transformedData = props.dataAxios.map((item) => ({
      symbol: item.symbol,
      priceChange: item.priceChange,
      priceChangePercent: item.priceChangePercent,
      weightedAvgPrice: item.weightedAvgPrice,
      prevClosePrice: item.prevClosePrice,
      lastPrice: item.lastPrice,
      lastQty: item.lastQty,
      bidPrice: item.bidPrice,
      bidQty: item.bidQty,
      askPrice: item.askPrice,
      askQty: item.askQty,
      openPrice: item.openPrice,
      highPrice: item.highPrice,
      lowPrice: item.lowPrice,
      volume: item.volume,
      quoteVolume: item.quoteVolume,
      openTime: format(new Date(item.openTime), "dd/MM/yyyy"),
      closeTime: format(new Date(item.closeTime), "dd/MM/yyyy"),
      firstId: item.firstId,
      lastId: item.lastId,
      count: item.count,
    }));
    setRowData(transformedData);
  }, [props.dataAxios]);

  //definisanje stila

  const cellStyle = (params) => {
    if (parseFloat(params.value) > 0) {
      return {
        background: "#c5ffbb",
      };
    } else if (parseFloat(params.value) === 0) {
      return {
        background: "#dfdddd",
      };
    } else {
      return {
        background: "#ffcece",
      };
    }
  };

  //definisanje kolona

  const columnDefs = [
    {
      field: "symbol",
      sortable: true,
      cellStyle: { fontWeight: "bold", background: "#b3e1ef" },
    },
    { field: "priceChange", sortable: true, cellStyle },
    { field: "priceChangePercent", sortable: true, cellStyle },
    { field: "weightedAvgPrice", sortable: true, cellStyle },
    { field: "prevClosePrice", sortable: true, cellStyle },
    { field: "lastPrice", sortable: true, cellStyle },
    { field: "lastQty", sortable: true, cellStyle },
    { field: "bidPrice", sortable: true, cellStyle },
    { field: "bidQty", sortable: true, cellStyle },
    { field: "askPrice", sortable: true, cellStyle },
    { field: "askQty", sortable: true, cellStyle },
    { field: "openPrice", sortable: true, cellStyle },
    { field: "highPrice", sortable: true, cellStyle },
    { field: "lowPrice", sortable: true, cellStyle },
    { field: "volume", sortable: true, cellStyle },
    { field: "quoteVolume", sortable: true, cellStyle },
    { field: "openTime", sortable: true, cellStyle: { background: "#b3e1ef" } },
    {
      field: "closeTime",
      sortable: true,
      cellStyle: { background: "#b3e1ef" },
    },
    { field: "firstId", sortable: true, cellStyle },
    { field: "lastId", sortable: true, cellStyle },
    { field: "count", sortable: true, cellStyle },
  ];

  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={20}
      />
    </div>
  );
};

export default Table;
