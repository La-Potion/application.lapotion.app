import React from "react";
import {View, Image, StyleSheet, Text, Button, Pressable} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import player from "../../assets/player.png";
import start from "../../assets/start.png";

const styles = StyleSheet.create({
    contentPlayer: {
        height: 75,
        width: '80%',
        borderRadius: 15,
        overflow: 'hidden'
    },
    namePlayer: {
        color: '#fff',
        fontSize: 35,
        fontFamily: 'Mouse Memoirs'
    },
    gradientPlayer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
    },
    playerImage: {
        height: 35,
        width: 35,
        position: 'absolute',
        left: 15
    },
});

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: props.player,
        };
    }

    render() {
        return (
            <View style={styles.contentPlayer}>
                <LinearGradient colors={['#F9C93A', '#F3A345']} style={styles.gradientPlayer}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}>
                    <Image style={styles.playerImage} source={player} />
                    <Text style={styles.namePlayer} >{this.state.player}</Text>
                </LinearGradient>
            </View>
        );
    }
}
