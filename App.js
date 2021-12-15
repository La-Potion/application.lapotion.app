import { useNetInfo } from "@react-native-community/netinfo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { initCartes, getCartes } from "./utils/Cartes";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    initCartes();
    // this.state = {
    //   cartes: {},
    // };
  }
  // componentDidMount() {
  // getCartes().then((data) => {
  //   this.setState({ cartes: data });
  // });
  // }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
      </View>
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
