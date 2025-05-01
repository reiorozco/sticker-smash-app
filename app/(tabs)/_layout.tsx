import { Tabs } from "expo-router";
import { GestureResponderEvent, Pressable, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// Theme color type definition
type ThemeColors = {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  tabIcon: string;
  tabIconActive: string;
};

// Themes for light and dark mode
const themes = {
  light: {
    primary: "#4872f6",
    background: "#ffffff",
    card: "#f8f8f8",
    text: "#333333",
    border: "#e0e0e0",
    tabIcon: "#777777",
    tabIconActive: "#4872f6",
  },
  dark: {
    primary: "#ffd33d",
    background: "#25292e",
    card: "#1c1e22",
    text: "#ffffff",
    border: "#3a3d42",
    tabIcon: "#999999",
    tabIconActive: "#ffd33d",
  },
};

// Animated Tab Button component
function AnimatedTabButton({
  onPress,
  focused,
  iconName,
  iconNameFocused,
  label,
  colors,
}: {
  onPress?: (event: GestureResponderEvent) => void;
  focused: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  iconNameFocused: keyof typeof Ionicons.glyphMap;
  label: string;
  colors: ThemeColors;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Animation effect on press
  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={`${label} tab`}
      style={{ flex: 1, alignItems: "center", paddingVertical: 8 }}
    >
      <Animated.View style={[{ alignItems: "center" }, animatedStyle]}>
        <Ionicons
          name={focused ? iconNameFocused : iconName}
          color={focused ? colors.tabIconActive : colors.tabIcon}
          size={24}
        />

        <Animated.Text
          style={{
            marginTop: 2,
            fontSize: 12,
            color: focused ? colors.tabIconActive : colors.tabIcon,
            fontWeight: focused ? "600" : "400",
          }}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [colors, setColors] = useState<ThemeColors>(
    colorScheme === "dark" ? themes.dark : themes.light,
  );

  // Update colors when color mode changes
  useEffect(() => {
    setColors(colorScheme === "dark" ? themes.dark : themes.light);
  }, [colorScheme]);

  return (
    <Tabs
      screenOptions={({ route, navigation }) => ({
        // Header styles
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0, // For Android
          shadowOpacity: 0, // For iOS
        },
        headerShadowVisible: false,
        headerTintColor: colors.text,

        // TabBar styles
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },

        // No default text labels (we handle them in TabButton)
        tabBarShowLabel: false,

        // Custom component for tabs
        tabBarButton: (props) => {
          const { onPress, accessibilityState } = props;
          const focused = accessibilityState?.selected || false;

          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          let iconNameFocused: keyof typeof Ionicons.glyphMap = "home";
          let label = "";

          if (route.name === "index") {
            iconName = "home-outline";
            iconNameFocused = "home";
            label = "Home";
          } else if (route.name === "about") {
            iconName = "information-circle-outline";
            iconNameFocused = "information-circle";
            label = "About";
          }

          return (
            <AnimatedTabButton
              onPress={onPress}
              focused={focused}
              iconName={iconName}
              iconNameFocused={iconNameFocused}
              label={label}
              colors={colors}
            />
          );
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Sticker Smash",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.text,
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "Roboto",
          },
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "React Native & Expo Tutorial",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor:
              colors.primary === "#ffd33d" ? "#1a1d20" : "#f0f0f0",
          },
          headerTitleStyle: {
            color: colors.primary === "#ffd33d" ? "#ffffff" : "#333333",
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Roboto",
          },
          headerTintColor: colors.primary === "#ffd33d" ? "#ffffff" : "#333333",
        }}
      />
    </Tabs>
  );
}
