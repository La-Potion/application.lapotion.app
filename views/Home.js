import React from "react";
import {View, Image, StyleSheet, Text, Button, Pressable} from "react-native";
import Game from '../utils/Game'
import modePicoletro from "../assets/Modes_picoletro.png";
import modeGlouglou from "../assets/Modes_glouglou.png";
import modeAvale from "../assets/Modes_avale.png";

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#0AB5A4",
        paddingBottom: 50,
    },
    logo: {
        top: 0,
        left: -100,
        height: 275,
        width: 275,
        position: 'absolute'
    },
    text: {
        top: '25%',
        right: '10%',
        position: 'absolute',
        color: '#fff',
        fontSize: 65,
        fontFamily: 'Mouse Memoirs'
    },
    title: {
        top: '-50%',
        backgroundColor: '#65E7DA',
        paddingHorizontal: 15,
        paddingVertical: 5,
        position: 'absolute',
        color: '#fff',
        fontSize: 35,
        fontFamily: 'Mouse Memoirs',
        borderRadius: 15
    },
    boxContent: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Mouse Memoirs',
    },
    button: {
        backgroundColor: "#34DAC9",
        width: '80%',
        height: '12%',
        borderRadius: 15,
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    icon: {
        left: -20,
        height: 40,
        width: 40,
        position: 'absolute'
    },
});

const logo = require("../assets/logo.png");

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async setup() {
        const game = await Game.get()
        this.setState({game: game})
    }

    async pressedAction(id) {
        await this.setup()
        if (this.state.game)
        {
            const game = this.state.game
            game.mode = id
            await Game.update(game)
        } else {
            new Game(id)
        }
        const { navigation } = this.props;
        navigation.navigate("PlayersList")
    }

    render() {
        return (
            <View style={styles.content}>
                <Image style={styles.logo} source={logo} />
                <Text style={styles.text}>Modes de jeu</Text>
                <Pressable style={[styles.button, {backgroundColor : '#34DAC9'}]} onPress={async () => await this.pressedAction(1)}>
                    <Text style={[styles.title, {backgroundColor : '#65E7DA'}]}>Glouglou</Text>
                    <Text style={styles.boxContent}>Pour un début de soirée ! Ou des petits joueurs...</Text>
                    <Image style={styles.icon} source={modeGlouglou} />
                </Pressable>
                <Pressable style={[styles.button, {backgroundColor : '#91BC8D'}]} onPress={async () => await this.pressedAction(2)}>
                    <Text style={[styles.title, {backgroundColor : '#8FDA88'}]}>Picoletro</Text>
                    <Text style={styles.boxContent}>C'est plus que bouré que tu l'es là maintenant.</Text>
                    <Image style={styles.icon} source={modePicoletro} />
                </Pressable>
                <Pressable style={[styles.button, {backgroundColor : '#DA8888'}]} onPress={async () => await this.pressedAction(3)}>
                    <Text style={[styles.title, {backgroundColor : '#E99C9C'}]}>Cul sec</Text>
                    <Text style={styles.boxContent}>Aussi chaud que le nom... (A faire avec un groupe mixte)</Text>
                    <Image style={styles.icon} source={modeAvale} />
                </Pressable>
            </View>
        );
    }
}
