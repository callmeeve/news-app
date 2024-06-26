import React from "react";
import { View, Text, Image, StyleSheet, Linking } from "react-native";
import { Button } from "react-native-paper";

export default function NewsDetailScreen({ route }) {
  const { news } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: news.urlToImage }} style={styles.newsImage} />
      <Text style={styles.newsTitle}>{news.title}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
        <Text style={styles.newsAuthor}>{news.author}</Text>
        <Text style={styles.newsPublishedAt}>{new Date(news.publishedAt).toDateString()}</Text>
      </View>
      <Text style={styles.newsDescription}>{news.description}</Text>
      <Text style={styles.newsContent}>{news.content}</Text>
      <Button color="#fff" style={styles.newsButton} onPress={() => Linking.openURL(news.url)}>
        Read More
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  newsImage: {
    width: "100%",
    height: 300,
    borderRadius: 5,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  newsAuthor: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  newsPublishedAt: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  newsDescription: {
    marginTop: 10,
    fontSize: 14,
  },
  newsContent: {
    marginTop: 10,
    fontSize: 14,
  },
  newsButton : {
    marginTop: 20,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
