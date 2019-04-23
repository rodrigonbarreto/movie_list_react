/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

class MoviesList extends PureComponent {
  state = {
    movies: [],
  }

  async componentDidMount() {
    try {
      console.log(process.env.REACT_APP_BASE_URL);
      const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=1f8fe10f30fc93faa34c2b0eaeaefa8a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <MovieGrid>
        {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
