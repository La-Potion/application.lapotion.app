import React from "react";
import {View, Image, StyleSheet, Text, Button, Pressable} from "react-native";
import logo from "../assets/logo.png";
import arrowLeft from "../assets/arrow-left.png";

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#0AB5A4",
        height: 150,
        width: '100%',
        position: "absolute",
        top: 0,
        left: 0,
    },
    title: {
        color: '#fff',
        fontSize: 35,
        fontFamily: 'Mouse Memoirs'
    },
    logo: {
        height: 75,
        width: 75,
    },
    arrow: {
        height: 25,
        width: 25,
        margin: 20,
    },
    button: {
        height: 65,
        width: 65,
        backgroundColor: '#22BCAD',
        borderRadius: 15
    },
});

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = props.navigation
        this.destination = props.destination
        this.state = {
        };
    }

    navigate() {
        const { navigation } = this.props;
        if (this.destination) navigation.navigate(this.destination)
        else navigation.goBack()
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.content}>
                <Pressable onPress={() => this.navigate()} style={styles.button}>
                    <Image style={styles.arrow} source={arrowLeft} />
                </Pressable>
                <Text style={styles.title}>{this.props.title}</Text>
                <Image style={styles.logo} source={logo} />
            </View>
        );
    }
}
