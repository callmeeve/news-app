import { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { Appbar } from "react-native-paper";
import Category from "../components/Category";

export default function HomeScreen({ navigation }) {
  const categories = [
    "All",
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLatestNews = async (category) => {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=4fed107c988f4d38ab91e6c2901cc907";

    if (category !== "All") {
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=4fed107c988f4d38ab91e6c2901cc907`;
    }

    try {
      setLoading(true);
      const response = await axios.get(url);
      setNews(response.data.articles);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLatestNews(selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="News App" />
      </Appbar.Header>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <Category
            key={index}
            title={category}
            active={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
          />
        ))}
      </View>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>{error.message}</Text>
        ) : (
          <ScrollView>
            {news.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("NewsDetail", { news: item })
                }
                style={styles.newsItem}
              >
                {item.urlToImage ? (
                    <Image
                    source={{ uri: item.urlToImage }}
                    style={styles.newsImage}
                  />
                ) : null}
                <Text style={styles.newsTitle}>{item.title}</Text>
                {item.description ? (
                    <Text style={styles.newsDescription}>{item.description}</Text>
                ) : null}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffff",
    height: 60,
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#ffff",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
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
  errorText: {
    color: "red",
  },
});
