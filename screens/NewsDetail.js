import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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
    height: 200,
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
});
