import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { debounce } from "lodash";

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchNews = useCallback(debounce(async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=4fed107c988f4d38ab91e6c2901cc907`
      );
      const data = await response.json();
      setSearchResults(data.articles);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, 500), []); // Debounce the search request by 500ms

  useEffect(() => {
    if (searchQuery) {
      searchNews(searchQuery);
    }
  }, [searchQuery, searchNews]);
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search here..."
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      ) : error ? (
        <Text>{error.message}</Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => item.url + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("NewsDetail", { news: item })}
              style={styles.newsItem}
            >
              <Image
                source={{ uri: item.urlToImage }}
                style={styles.newsImage}
              />
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    marginHorizontal: 10,
    marginVertical: 24,
    borderWidth: 1,
    padding: 12,
    borderColor: "#ddd",
    borderRadius: 50,
  },
  newsItem: {
    marginBottom: 15,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    elevation: 0.5,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  newsDescription: {
    marginTop: 10,
    fontSize: 14,
  },
  newsImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
});
