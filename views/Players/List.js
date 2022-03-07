import React from "react";
import {View, ScrollView, Image, StyleSheet, Text, Button, Pressable, TextInput, TouchableOpacity} from "react-native";
import Header from '../../components/Header';
import Game from '../../utils/Game'
import logo from "../../assets/logo.png";
import close from "../../assets/remove.png";
import start from "../../assets/start.png";
import check from "../../assets/check.png";
import {LinearGradient} from 'expo-linear-gradient';
import {LOCAL} from "../../utils/Cartes";

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#0AB5A4",
        paddingBottom: 50,
        paddingTop: 150,
    },
    input: {
        width: '100%',
        height: '100%',
        backgroundColor: '#22BCAD',
        borderRadius: 15,
        paddingHorizontal: 25,
        color: '#fff',
        fontSize: 25,
        fontFamily: 'Mouse Memoirs',
    },
    inputContent: {
        width: '80%',
        height: 75,
        marginBottom: 100,
    },
    error: {
        borderColor: '#F25C5C',
        borderWidth: 3,
    },
    pressButton: {
        width: '80%',
        height: 75,
        backgroundColor: '#22BCAD',
        borderRadius: 15,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25,
        borderColor: '#1AA698',
        borderWidth: 3,
        flexDirection: "row"
    },
    pressTitle: {
        color: '#fff',
        fontSize: 35,
        fontFamily: 'Mouse Memoirs'
    } ,
    errorTxt: {
        color: '#d95252',
        fontSize: 22,
        fontFamily: 'Mouse Memoirs'
    } ,
    close: {
        height: 25,
        width: 25,
    },
    check: {
        height: 25,
        width: 25,
    },
    checkButton: {
        top: 0,
        right: 0,
        height: 75,
        width: 75,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    start: {
        height: 20,
        width: 15,
    },
    scrollView: {
        width: '100%',
    },
    startButton: {
        width: '80%',
        height: 75,
        backgroundColor: '#efc12d',
        borderRadius: 15,
        marginTop: 15,
        borderColor: '#5BCDC2',
        borderWidth: 5,
        overflow: 'hidden',
        position: 'relative'

    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: "row",
    },
});

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.navigation = navigation
        this.state = {
            players: [],
            forceRefresh: Math.floor(Math.random() * 100),
            emptyPlayer: false,
            select: false,
            game: props.game
        };
        this.getExistingPlayers()
    }

    async getExistingPlayers() {
        const players = await Game.getPlayers()
        this.setState({players: players, forceRefresh: Math.floor(Math.random() * 100)})
    }

    async addPlayer(value) {
        if (!value){
            this.setState({emptyPlayer: true})
            return
        }
        const players = this.state.players ? this.state.players : new Array()
        players.push(value)
        this.setState({
            players: players,
            forceRefresh: Math.floor(Math.random() * 100),
            text: '',
            select: false
        })
        await this.updateGamePlayer()
    }

    async removePlayer(value) {
        const players = this.state.players
        const newPlayers = players.filter((player) => player !== value)
        this.setState({
            players: newPlayers,
            forceRefresh: Math.floor(Math.random() * 100),
        })
        await this.updateGamePlayer()
    }

    async startGame() {
        if (this.state.text) this.addPlayer(this.state.text)
        if (!this.state.players || this.state.players.length <= 1) {
            this.setState({emptyPlayer: true})
            return
        }
        await this.updateGamePlayer()
        const { navigation } = this.props
        navigation.navigate('GameCard')
    }

    async updateGamePlayer() {
        const game = await Game.get()
        game.players = this.state.players
        await Game.update(game)
    }

    changeText(text) {
        this.setState({
            text: text,
            emptyPlayer: false,
            select: true
        })
        if (!text) this.setState({select: false})
    }

    render() {
        const players = this.state.players ? this.state.players : []
        return (
            <View style={styles.content}>
                <Header navigation={this.navigation} title={'Buveurs'} />
                <ScrollView style={styles.scrollView} contentContainerStyle={{flexGrow: 1,
                    alignItems: 'center'}}>
                    {players.map((player, i) => (
                        <Pressable onPress={() => this.removePlayer(player)} style={styles.pressButton} key={this.state.forceRefresh + i}>
                            <Text style={styles.pressTitle}>{player}</Text>
                            <Image style={styles.close} source={close} />
                        </Pressable>
                    ))}
                    {this.state.emptyPlayer ? <Text style={styles.errorTxt}>2 Joueurs minimum</Text> : null}
                    <View style={styles.inputContent}>
                        <TextInput
                            style={[styles.input, this.state.emptyPlayer ? styles.error : '']}
                            placeholder="Ajouter..."
                            keyboardType="default"
                            placeholderTextColor="#7AEFE4"
                            onSubmitEditing={async () => await this.addPlayer(this.state.text)}
                            onEndEditing={async () => await this.addPlayer(this.state.text)}
                            onChangeText={text => this.changeText(text)}
                            value={this.state.text}
                            maxLength={25}
                         />
                        {this.state.select ? <Pressable style={styles.checkButton} onPress={async () => await this.addPlayer(this.state.text)}>
                            <Image style={styles.check} source={check} />
                        </Pressable> : null}
                    </View>
                </ScrollView>
                <Pressable style={styles.startButton} onPress={async () => await this.startGame()}>
                    <LinearGradient colors={['#F9C93A', '#F3A345']} style={styles.gradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}>
                        <Text style={styles.pressTitle}>Buvons</Text>
                        <Image style={styles.start} source={start} />
                    </LinearGradient>
                </Pressable>
            </View>
        );
    }
}
