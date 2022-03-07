import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Game {
    constructor(mode, players = []) {
        this.game = 1
        this.mode = mode
        this.players = []
        this.initialize()
    }

    async initialize()
    {
        await AsyncStorage.removeItem("@game")
        await AsyncStorage.setItem("@game", JSON.stringify(await this.toJSON()))
    }

    static async clear() {
        await AsyncStorage.removeItem("@game");
    }

    async toJSON() {
        return {
            game: this.game,
            mode: this.mode,
            players: this.players
        }
    }

    static async get() {
        return JSON.parse(await AsyncStorage.getItem('@game'))
    }

    static async getPlayers() {
        const json = JSON.parse(await AsyncStorage.getItem('@game'))
        return json ? json.players ? json.players : [] : []
    }

    static async update(json){
        await AsyncStorage.setItem("@game", JSON.stringify(json))
    }
}