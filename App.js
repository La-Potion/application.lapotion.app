import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { initCartes, LOCAL } from "./utils/Cartes";
import { NavigationContainer } from "@react-navigation/native";
import Game from './utils/Game'
import MouseMemoirs from './fonts/Mouse Memoirs.ttf'

import * as Font from 'expo-font';

import Navigator from "./components/Navigator"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    Game.clear()
    initCartes();
  }

  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      'Mouse Memoirs': MouseMemoirs,
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (!this.state.fontsLoaded) return null
    return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Navigator />
    </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
