import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";

const Tab = createMaterialBottomTabNavigator();

function BottomBar() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="black"
      inactiveColor="gray"
      activeIndicatorStyle={{ backgroundColor: "#ffff" }}
      barStyle={{
        backgroundColor: "#ffff",
        paddingBottom: 5,
        elevation: 5,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-grid-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={SearchScreen}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomBar;
