import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

export async function initCartes() {
  if (!(await NetworkUtils.isNetworkAvailable())) return;
  if ((await LOCAL.getCartes()) == null) {
    await API.getAllCards((data) => LOCAL.setCartes(data));
  } else {
    let cartes = await LOCAL.getCartes();
    await API.getUpdate(async (data) => {
        data.map(async (card) => {
          let updated = false
          cartes.forEach((carte, index) => {
            if (carte.id == card.id) {
              updated = true
              cartes[index] = card
            }
          });
          if (!updated) cartes.push(card)
        })
        await LOCAL.setCartes(cartes)
    });
    await API.getIDs(async (objects) => {
      const ids = new Array();
      await objects.map(async (object) => ids.push(object.id))
      cartes = cartes.filter((carte, i) => {
        return ids.includes(carte.id)
      })
      await LOCAL.setCartes(cartes)
    })
  }
}

class API {
  static async getAllCards(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.lapotion.app/cartes");
    xhr.setRequestHeader(
        "app-token",
        "MSVNQZXSd8WGaDhcMzXngDQnwE2JQzuf4xRzc9eyMfhrVEgzacvBBZ4xrWhftHkF8PS6E2qVCBf8ezfUEBvQf4BQ4SXVw5XppAZFbGYRZaJsRKFg4dfJ5fQrrWWmXfRt"
    );
    xhr.onload = (e) => {
      let res = xhr.response;
      let json = JSON.parse(res);
      callback(json);
    };
    xhr.send();
  }
  static async getIDs(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.lapotion.app/getIDs");
    xhr.setRequestHeader(
        "app-token",
        "MSVNQZXSd8WGaDhcMzXngDQnwE2JQzuf4xRzc9eyMfhrVEgzacvBBZ4xrWhftHkF8PS6E2qVCBf8ezfUEBvQf4BQ4SXVw5XppAZFbGYRZaJsRKFg4dfJ5fQrrWWmXfRt"
    );
    xhr.onload = (e) => {
      let res = xhr.response;
      let json = JSON.parse(res);
      callback(json);
    };
    xhr.send();
  }
  static async getUpdate(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.lapotion.app/update");
    xhr.setRequestHeader(
      "app-token",
      "MSVNQZXSd8WGaDhcMzXngDQnwE2JQzuf4xRzc9eyMfhrVEgzacvBBZ4xrWhftHkF8PS6E2qVCBf8ezfUEBvQf4BQ4SXVw5XppAZFbGYRZaJsRKFg4dfJ5fQrrWWmXfRt"
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = (e) => {
      let res = xhr.response;
      let json = JSON.parse(res);
      callback(json);
    };
    xhr.send(
      JSON.stringify({
        last_update: await LOCAL.getLastUpdate(),
      })
    );
  }
}

export class LOCAL {
  static async getCartes() {
    const cartes = await AsyncStorage.getItem("@cartes");
    return JSON.parse(cartes);
  }

  static async getCartesByMode(mode) {
    let cartes = await LOCAL.getCartes()
    cartes = cartes.filter((carte) => {
      const modes = carte.mode_cartes ? carte.mode_cartes.filter((mode_cartes) => {return mode_cartes.mode_id === mode})[0] : 0
      return modes && modes.mode_id === mode
    })
    return cartes
  }

  static async setCartes(json) {
    await AsyncStorage.setItem("@cartes", JSON.stringify(json));
    const date = new Date();
    await AsyncStorage.setItem("@last_update", date.toISOString());
  }

  static async addCartes(json) {
    const cards = await this.getCartes();
    cards.push(json);
    await AsyncStorage.setItem("@cartes", JSON.stringify(cards));
    const date = new Date();
    await AsyncStorage.setItem("@last_update", date.toISOString());
  }

  static async getLastUpdate() {
    return await AsyncStorage.getItem("@last_update");
  }

  static async clear() {
    await AsyncStorage.removeItem("@cartes");
  }
}

export default class NetworkUtils {
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isInternetReachable;
  }
}
