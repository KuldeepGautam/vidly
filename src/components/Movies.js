import React, { Component } from "react";
import { getMovies } from "../components/services/fakeMovieService";
import { getGenres } from "../components/services/fakeGenreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "./utils/paginate";
import MovieTable from "./movieTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genre" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleGenre = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database...!!</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path]);
    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="container-fluid">
        <br />
        <div className="row">
          <div className="col-lg-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenre}
            />
          </div>
          <div className="col-lg-9">
            <div>
              <div>
                <p>There are {filtered.length} in the database..!!</p>
                <MovieTable
                  movies={movies}
                  onDelete={this.handleDelete}
                  onSort={this.handleSort}
                />
                <Pagination
                  itemCount={filtered.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
