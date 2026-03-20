import { Alert, Platform, ToastAndroid } from "react-native";

export function notify(message: string, title = "Info") {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.LONG);
    return;
  }

  Alert.alert(title, message);
}
