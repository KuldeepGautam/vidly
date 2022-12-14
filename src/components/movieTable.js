import React, { Component } from "react";
import Table from "./common/table";

class MovieTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Delete",
      content: (movie) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <>
        <Table
          columns={this.columns}
          data={movies}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </>
    );
  }
}

export default MovieTable;
