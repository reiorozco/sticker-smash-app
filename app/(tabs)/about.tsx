import { useRef, useState } from "react";
import {
  Animated,
  Image,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Logo and icon images
const ExpoIcon = require("@/assets/images/expo-icon.png");

export default function AboutScreen() {
  const { width } = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  // Handle scroll event manually instead of using Animated.event
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    scrollY.setValue(offsetY);
  };

  // List of topics covered in the tutorial
  const topics = [
    "Create an app using the default template with TypeScript enabled",
    "Implement a two-screen bottom tabs layout with Expo Router",
    "Break down the app layout and implement it with flexbox",
    "Use each platform's system UI to select an image from the media library",
    "Create a sticker modal using the <Modal> and <FlatList> components from React Native",
    "Add touch gestures to interact with a sticker",
    "Use third-party libraries to capture a screenshot and save it to the disk",
    "Handle platform differences between Android, iOS, and web",
    "Finally, go through the process of configuring a status bar, a splash screen, and an icon to complete the app",
  ];

  // Email handler function
  const handleEmailPress = () => {
    void Linking.openURL("mailto:rfoc15@gmail.com");
  };

  // Toggle expanded state for topics
  const toggleExpanded = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tutorial Objective</Text>
          <Text style={styles.paragraph}>
            The goal of this tutorial is to get started with Expo and become
            familiar with the Expo SDK. Through various chapters, you'll learn
            the fundamentals needed to build a complete application using React
            Native and Expo.
          </Text>
          <Text style={styles.paragraph}>
            This tutorial is self-paced and can take up to two hours to
            complete. To keep it beginner-friendly, we've divided it into nine
            chapters so that you can follow along step by step or put it down
            and come back to it later. Each chapter contains the necessary code
            snippets to complete the steps.
          </Text>
        </View>

        {/* Covered topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topics Covered</Text>
          <View style={styles.topicsContainer}>
            {topics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.topicItem,
                  expanded[index] && styles.expandedTopic,
                  { maxWidth: width - 40 }, // Adjustment for small screens
                ]}
                onPress={() => toggleExpanded(index)}
                activeOpacity={0.7}
                accessible={true}
                accessibilityLabel={`Topic ${index + 1}: ${topic}`}
                accessibilityRole="button"
                accessibilityHint="Tap to expand description"
              >
                <View style={styles.topicHeader}>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="#ffd33d"
                    style={styles.checkIcon}
                  />
                  <Text
                    style={styles.topicText}
                    numberOfLines={expanded[index] ? undefined : 1}
                  >
                    {topic}
                  </Text>
                  <Ionicons
                    name={expanded[index] ? "chevron-up" : "chevron-down"}
                    size={22}
                    color="#888"
                  />
                </View>
                {expanded[index] && (
                  <Text style={styles.topicDescription}>
                    This topic will teach you fundamental aspects of building
                    mobile and web applications with React Native and Expo.
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tools and technologies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tools & Technologies</Text>
          <View style={styles.techContainer}>
            <View style={styles.techItem}>
              <Ionicons name="logo-react" size={40} color="#61dafb" />
              <Text style={styles.techName}>React Native</Text>
            </View>
            <View style={styles.techItem}>
              <Image
                source={ExpoIcon}
                style={styles.techLogo}
                resizeMode="contain"
              />
              <Text style={styles.techName}>Expo SDK</Text>
            </View>
            <View style={styles.techItem}>
              <Ionicons name="code-slash" size={40} color="#3178c6" />
              <Text style={styles.techName}>TypeScript</Text>
            </View>
          </View>
        </View>

        {/* Credits */}
        <View style={[styles.section, styles.creditsSection]}>
          <Text style={styles.sectionTitle}>Credits</Text>
          <View style={styles.developerInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>RO</Text>
            </View>
            <View style={styles.developerDetails}>
              <Text style={styles.developerName}>Rei Orozco</Text>
              <TouchableOpacity
                onPress={handleEmailPress}
                accessible={true}
                accessibilityLabel="Email: rfoc15@gmail.com"
                accessibilityRole="link"
                accessibilityHint="Tap to send an email"
              >
                <Text style={styles.developerEmail}>rfoc15@gmail.com</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} - React Native & Expo Tutorial
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    backgroundColor: "#ffd33d",
    borderRadius: 30,
    height: 60,
    justifyContent: "center",
    marginRight: 15,
    width: 60,
  },
  avatarText: {
    color: "#25292e",
    fontSize: 24,
    fontWeight: "bold",
  },
  checkIcon: {
    marginRight: 10,
  },
  container: {
    backgroundColor: "#25292e",
    flex: 1,
  },
  copyright: {
    color: "#888",
    fontSize: 14,
    marginTop: 15,
    textAlign: "center",
  },
  creditsSection: {
    backgroundColor: "#1c1e22",
  },
  developerDetails: {
    flex: 1,
  },
  developerEmail: {
    color: "#ffd33d",
    fontSize: 16,
  },
  developerInfo: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  developerName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  expandedTopic: {
    backgroundColor: "#2d3236",
  },
  logo: {
    height: 50,
    marginRight: 15,
    width: 50,
  },
  paragraph: {
    color: "#e0e0e0",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    padding: 20,
  },
  sectionTitle: {
    color: "#ffd33d",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  techContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 1,
  },
  techItem: {
    alignItems: "center",
    padding: 10,
  },
  techLogo: {
    height: 40,
    width: 40,
  },
  techName: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 8,
  },
  topicDescription: {
    color: "#bbb",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    paddingLeft: 3,
  },
  topicHeader: {
    alignItems: "center",
    flexDirection: "row",
  },
  topicItem: {
    backgroundColor: "#333940",
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topicText: {
    color: "#fff",
    flex: 1,
    fontSize: 15,
    lineHeight: 2,
  },
  topicsContainer: {
    marginTop: 5,
  },
});
