import * as React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { StyleSheet, Button, Text, View, Image, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { userState } from '../recoil/atoms/auth';

import MoviesApi from '../api/movies';
const moviesApi = new MoviesApi();

export default function HomeScreen() {
  const setUser = useSetRecoilState(userState);
  const currentUserState = useRecoilValue(userState);
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const data = await moviesApi.getMovies();
      setMovies(data);
    };

    bootstrapAsync();
  }, []);

  const logout = async () => {
    setUser({ loggedIn: false, access_token: null, refresh_token: null });
    await SecureStore.deleteItemAsync('access_token');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Filmes Brabos</Text>
        {movies.map((movie) => (
          <View key={movie.id} style={styles.movies}>
            <Text style={styles.movieTitle}>
              {movie.title} - {movie.year}
            </Text>
            <Text style={styles.movieGenre}>
              {movie.genre}
            </Text>
            <Image source={{ uri: movie.poster }} style={{ width: 200, height: 300 }} />
          </View>
        ))}
        <Button title="Logout" onPress={() => logout()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold'
  },
  movies: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieGenre: {
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
