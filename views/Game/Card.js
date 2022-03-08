import React from "react";
import {View, ScrollView, Image, StyleSheet, Text, Button, Pressable, TextInput, TouchableOpacity} from "react-native";
import Header from "../../components/Header";
import GamePlayer from "../../components/Game/Player";
import GameCard from "../../components/Game/Card";
import Game from "../../utils/Game";
import {LOCAL} from "../../utils/Cartes";
import ar from "../../assets/ar.png";
import al from "../../assets/al.png";
import start from "../../assets/start.png";
import {LinearGradient} from "expo-linear-gradient";
import player from "../../assets/player.png";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#0AB5A4",
        paddingBottom: 50,
        paddingTop: 150,
    },
    pressLeft: {
        height: '55%',
        width: 35,
        backgroundColor: '#ffffff',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        position: 'absolute',
        left: 0,
        top: '5%',
        transform: [{ translateY: 250 }],
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressRight: {
        height: '55%',
        width: 35,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        position: 'absolute',
        right: 0,
        top: '5%',
        transform: [{ translateY: 250 }],
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowPrevNext: {
        height: 25,
        width: 25,
    },
    contentPlayer: {
        height: 75,
        width: '75%',
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
    drag: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        position: 'relative',
        height: '65%',
        width: '75%'
    },
});

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.navigation = navigation
        const history = new Array()
        const historyCounter = new Map()
        this.state = {
            history: history,
            historyCounter: historyCounter,
            target: '',
            cartes: [{
                commun: false,
                display: true,
                duree: null,
                duree_id: null,
                id: 0,
                joueurs: 0,
                question: "Empty",
                question_bis: null,
                subix: "Empty",
                type: {
                    description: "Empty",
                    name: "Empty",
                    type_ref: "Empty",
                }
            }],
            carteIndex: 0,
            forceRefresh: Math.floor(Math.random() * 100),
            game: {
                mode: 1,
                players: []
            },
        };
        this.setup()
    }

    async setup() {
        const game = await Game.get()
        this.setState({game: game})
        let cartes = await LOCAL.getCartesByMode(game.mode)
        cartes = cartes.sort(() => Math.random() - 0.5)
        this.setState({cartes: cartes, forceRefresh: Math.floor(Math.random() * 100)})
        this.definePlayer(0)
    }

    nextCard() {
        const index = this.state.carteIndex+1 < this.state.cartes.length ? this.state.carteIndex+1 : this.state.carteIndex
        this.setState({carteIndex: index, forceRefresh: Math.floor(Math.random() * 100)})
        this.definePlayer(index)
    }

    prevCard() {
        const index = this.state.carteIndex-1 >= 0 ? this.state.carteIndex-1 :0
        this.setState({carteIndex: index, forceRefresh: Math.floor(Math.random() * 100)})
        this.definePlayer(index)
    }

    definePlayer(carteIndex) {
        if (this.state.cartes[carteIndex].commun) this.setState({target: 'Tous les buveurs'})
        else {
            const history = this.state.history
            const target = (history && history[carteIndex]) ? history[carteIndex] : this.randomPlayer()
            const historyCounter = (history && history[carteIndex]) ? this.state.historyCounter : (this.state.historyCounter.get(target) ?
                this.state.historyCounter.set(target, this.state.historyCounter.get(target)+1) :
                this.state.historyCounter.set(target, 1))
            if (!history[carteIndex]) history.push(target)
            this.setState({target: target, historyCounter: historyCounter, history: history})
        }
    }

    randomPlayer() {
        const player = this.state.game.players[Math.floor(Math.random() * this.state.game.players.length)]
        return player
    }

    render() {
        const config = {
            velocityThreshold: 0.2,
            directionalOffsetThreshold: 50
        };
        return (
            <View style={styles.content}>
                <Header navigation={this.navigation} destination={'PlayersList'} title={'La Potion'} />
                <View style={styles.contentPlayer}>
                    <LinearGradient colors={['#F9C93A', '#F3A345']} style={styles.gradientPlayer}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}>
                        <Image style={styles.playerImage} source={player} />
                        <Text style={styles.namePlayer}>{this.state.target}</Text>
                    </LinearGradient>
                </View>
                <GestureRecognizer
                    style={styles.drag}
                    onSwipeLeft={() => this.nextCard()}
                    onSwipeRight={() => this.prevCard()}
                    config={config}
                >
                    <GameCard
                        type={this.state.cartes[this.state.carteIndex].type.type_ref}
                        title={this.state.cartes[this.state.carteIndex].type.name}
                        question={this.state.cartes[this.state.carteIndex].question}
                        subix={this.state.cartes[this.state.carteIndex].subix}
                        key={this.state.forceRefresh}
                        mode={this.state.game.mode}
                        players={this.state.game.players}
                    />
                </GestureRecognizer>
                {
                    this.state.carteIndex >= 1 &&
                    <TouchableOpacity onPress={() => this.prevCard()} style={styles.pressLeft}>
                        <Image style={styles.arrowPrevNext} source={al} />
                    </TouchableOpacity>
                }
                {
                    this.state.carteIndex < this.state.cartes.length-1 &&
                    <TouchableOpacity onPress={() => this.nextCard()} style={styles.pressRight}>
                        <Image style={styles.arrowPrevNext} source={ar} />
                    </TouchableOpacity>
                }
            </View>
        );
    }
}
