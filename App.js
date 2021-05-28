import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { createStore } from "redux";
import { Provider } from "react-redux";

import Deck from "./components/Deck";
import AddDeck from "./components/AddDeck";
import DeckList from "./components/DeckList";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import reducer from "./reducers";
import QuizResult from "./components/QuizResult";

function StatusBarHandler({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar
                translucent
                backgroundColor={backgroundColor}
                {...props}
            />
        </View>
    );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "DeckList") {
                        iconName = focused ? "layers" : "layers-outline";
                    } else if (route.name === "AddDeck") {
                        iconName = focused
                            ? "add-circle"
                            : "add-circle-outline";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: "#2c3e50",
                inactiveTintColor: "gray",
            }}
        >
            <Tab.Screen name="DeckList" component={DeckList} />
            <Tab.Screen name="AddDeck" component={AddDeck} />
        </Tab.Navigator>
    );
}

const Stack = createStackNavigator();
function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Deck" component={Deck} />
            <Stack.Screen name="AddCard" component={AddCard} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="QuizResult" component={QuizResult} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <Provider store={createStore(reducer)}>
            <View style={{ flex: 1 }}>
                <StatusBarHandler
                    backgroundColor="#666"
                    barStyle="light-content"
                />
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </View>
        </Provider>
    );
}
