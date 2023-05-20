import Toast from "react-native-toast-message";

export function showMaintenanceToast() {
  Toast.show({
    type: "info",
    text1: "Fonctionnalité à venir",
    text2: "Elle sera bientôt disponible, restez à l'affut !",
    visibilityTime: 4000,
  });
}
