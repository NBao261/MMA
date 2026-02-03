import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export const FlowerLandingPage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Blooming Flowers</Text>
        <Text style={styles.subtitle}>Fresh flower delivery service</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1463043254199-7a3efd782ad1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Search for flowers..."
        />
      </View>

      <View>
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Flowers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.flowerCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1463043254199-7a3efd782ad1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={styles.flowerImage}
              />
              <Text style={styles.flowerTile}>White Base</Text>
            </View>
            <View style={styles.flowerCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={styles.flowerImage}
              />
              <Text style={styles.flowerTile}>Red Rose</Text>
            </View>
            <View style={styles.flowerCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={styles.flowerImage}
              />
              <Text style={styles.flowerTile}>Lily</Text>
            </View>
            <View style={styles.flowerCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={styles.flowerImage}
              />
              <Text style={styles.flowerTile}>Tulip</Text>
            </View>
            <View style={styles.flowerCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={styles.flowerImage}
              />
              a<Text style={styles.flowerTile}>Orchid</Text>
            </View>
            <View style={styles.flowerCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                style={styles.flowerImage}
              />
              <Text style={styles.flowerTile}>Chrysanthemum</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Shop Now")}
          >
            <Text style={styles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  searchContainer: {
    padding: 16,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  featuredSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  flowerCard: {
    marginRight: 12,
    alignItems: "center",
  },
  flowerImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  flowerTile: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    padding: 16,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});
