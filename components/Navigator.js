import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from '@react-navigation/stack';

import HomeScreen from "../views/Home";
import PlayersList from "../views/Players/List";
import GameCard from "../views/Game/Card";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerShown: false,
    ...TransitionPresets.FadeFromBottomAndroid,
};

export default class Navigator extends React.Component {
    render() {
        return (
            <Stack.Navigator
                screenOptions={screenOptionStyle}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="PlayersList" component={PlayersList}/>
                <Stack.Screen name="GameCard" component={GameCard}/>
            </Stack.Navigator>
        );
    }
}