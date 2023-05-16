import axios from 'axios';

export default class MoviesApi {
  async getMovies() {
    try {
      const { data } = await axios.get('http://191.52.55.47:19004/movies');
      return Promise.resolve(data);
    } catch (error) {
      return Promise.error(error);
    }
  }
}
