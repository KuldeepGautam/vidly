import React, { Component } from "react";

class MovieTable extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "Desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, onDelete } = this.props;
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => this.raiseSort("title")}>Title</th>
              <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
              <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
              <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default MovieTable;
