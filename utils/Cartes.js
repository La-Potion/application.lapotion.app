import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

export async function initCartes() {
  const date = new Date();
  if (!(await NetworkUtils.isNetworkAvailable())) return;
  if ((await LOCAL.getCartes()) == null) {
    await API.getAllCards((data) => LOCAL.setCartes(data));
  } else {
    await API.getUpdate((data) =>
      data.forEach((card) => LOCAL.addCartes(card))
    );
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

class LOCAL {
  static async getCartes() {
    const cartes = await AsyncStorage.getItem("@cartes");
    return JSON.parse(cartes);
  }

  static async setCartes(json) {
    await AsyncStorage.setItem("@cartes", JSON.stringify(json));
    const date = new Date();
    await AsyncStorage.setItem("@last_update", date.toISOString());
  }

  static async addCartes(json) {
    const cards = await this.getCartes();
    cards.push(json);
    console.log(cards);
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
