import React from "react";
import {View, Image, StyleSheet, Text, Button, Pressable} from "react-native";
import modePicoletro from "../../assets/Modes_picoletro.png";
import modeGlouglou from "../../assets/Modes_glouglou.png";
import modeAvale from "../../assets/Modes_avale.png";
import logo from "../../assets/logo.png";
import bulles_left from "../../assets/bulles_left.png";
import bulles_right from "../../assets/bulles_right.png";
import Game from "../../utils/Game";
import { LOCAL } from '../../utils/Cartes'

const styles = StyleSheet.create({
    content: {
        height: '100%',
        width: '100%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        borderColor: '#F1F9F9',
        borderWidth: 5,
        marginTop: 25,
        paddingVertical: 25,
        paddingHorizontal: 15
    },
    contentLA: {
        justifyContent: 'center',
        backgroundColor: '#F3A345',
    },
    contentTA: {
        justifyContent: 'center',
    },
    subContentTA: {
        marginVertical: 10
    },
    subContent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#78A3AD',
        fontSize: 35,
        fontFamily: 'Mouse Memoirs',
        marginBottom: 10
    },
    titleLA: {
        color: '#FFFFFF',
        fontSize: 45,
        fontFamily: 'Mouse Memoirs',
        marginBottom: 10,
        marginTop: 25
    },
    question: {
        color: '#494949',
        fontSize: 25,
        fontFamily: 'Mouse Memoirs',
        textAlign: 'center'
    },
    questionLA: {
        color: '#FFFFFF',
        fontSize: 25,
        fontFamily: 'Mouse Memoirs',
        textAlign: 'center'
    },
    subixTitle: {
        color: '#e79943',
        fontSize: 25,
        fontFamily: 'Mouse Memoirs',
        marginBottom: 5,
    },
    subixTitleLA: {
        color: '#FFFFFF',
        fontSize: 25,
        fontFamily: 'Mouse Memoirs',
        marginBottom: 5,
        marginTop: 25
    },
    subix: {
        color: '#494949',
        fontSize: 20,
        fontFamily: 'Mouse Memoirs',
        textAlign: 'center'
    },
    subixLA: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Mouse Memoirs',
        textAlign: 'center'
    },
    icon: {
        height: 35,
        width: 35,
    },
    iconLA: {
        height: 100,
        width: 100,
        position: 'absolute',
        top: -50
    },
    bulles_left: {
        height: 75,
        width: 42,
        position: 'absolute',
        top: '15%',
        left: 15
    },
    bulles_right: {
        height: 75,
        width: 55,
        position: 'absolute',
        bottom: '15%',
        right: 15
    },
    bulles_rightLA: {
        height: 75,
        width: 55,
        position: 'absolute',
        bottom: '15%',
        right: 15,
        opacity: 0.4
    }
});

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        const params = this.configureParams()
        this.state = {
            title: props.title,
            question: params.question,
            question_bis: props.question_bis,
            subix: params.subix,
            mode: props.mode,
            type: props.type
        };
    }

    configureParams() {
        let question = this.configure(this.props.question)
        let subix = this.configure(this.props.subix)
        return {
            question: question,
            subix: subix
        }
    }

    configure(elem) {
        elem = this.configureRandom(elem)
        elem = this.configurePlayers(elem)
        return elem
    }

    configureRandom(elem) {
        const min = this.props.mode == 1 ? 1 : this.props.mode == 2 ? 2 : 3;
        const max = this.props.mode == 1 ? 3 : this.props.mode == 4 ? 2 : 5;
        return elem && elem.includes('{%random%}') ? elem.replace('{%random%}', Math.floor(Math.random() * (max - min) + min)) : elem
    }

    configurePlayers(elem) {
        const regex = /({%joueur\d%})/i;
        let usedPlayer = []
        while (elem && elem.match(regex)) {
            let player = this.props.players[Math.floor(Math.random() * this.props.players.length)]
            while (usedPlayer.includes(player)) player = this.props.players[Math.floor(Math.random() * this.props.players.length)]
            elem = elem.replace(regex, player)
            usedPlayer.push(player)
        }
        return elem
    }

    render() {
        return (
            <View style={[styles.content,
                this.state.type == 'LA' && styles.contentLA,
                this.state.type == 'TA' && styles.contentTA]}>
                <Image style={styles.bulles_left} source={bulles_left} />
                <Image style={this.state.type == 'LA' ? styles.bulles_rightLA : styles.bulles_right} source={bulles_right} />
                <Image
                    style={this.state.type == "LA" ? styles.iconLA : styles.icon}
                    source={this.state.type == "LA" ? logo : this.state.mode == 1 ? modeGlouglou : this.state.mode == 2 ? modePicoletro : modeAvale }
                />
                <View style={styles.subContent}>
                    <Text style={this.state.type == 'LA' ? styles.titleLA : styles.title}>
                        {this.state.type == "TA" ? 'Tasume' : this.state.title}
                    </Text>
                    <Text style={this.state.type == 'LA' ? styles.questionLA : styles.question}>{this.state.question}</Text>
                </View>
                <View style={styles.subContent}>
                    <Text style={this.state.type == 'LA' ? styles.subixTitleLA : styles.subixTitle}>{this.state.subix && 'La punition'}</Text>
                    <Text style={this.state.type == 'LA' ? styles.subixLA : styles.subix}>{this.state.subix}</Text>
                </View>
                {
                    this.state.type == 'TA' &&
                    <View style={[styles.subContent]}>
                        <Text style={styles.title}>ou Tasumepa</Text>
                        <Text style={styles.question}>{this.state.question_bis}</Text>
                    </View>
                }
            </View>
        );
    }
}
