import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "../../hooks/useNavigation";
import { useDuplicateRecipe } from "../../services/recipes";
import { TQrCode } from "../../types/recipe";

interface ScanRecipeFromUserProps {}

export function ScanRecipeFromUser(props: ScanRecipeFromUserProps) {
  const {} = props;
  const [isScanned, setIsScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    getPermission();
    setIsScanned(false);
  }, []);

  async function getPermission() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  }

  const duplicateRecipe = useDuplicateRecipe();

  const { goBack } = useNavigation();

  async function onScan({ data }: BarCodeEvent) {
    if (isScanned) return;
    setIsScanned(true);
    try {
      const {
        data: { id },
        action,
      }: TQrCode = JSON.parse(data);

      if (action == "duplicateRecipe") {
        try {
          await duplicateRecipe(id);
          Toast.show({
            text1: "Copie réalisée avec succès",
            type: "success",
          });
          goBack();
        } catch {
          Toast.show({
            text1: "Copie impossible à réaliser",
            text2: "Une erreur imprévue est survenue",
            type: "error",
          });
        }
      }
    } catch {
      Toast.show({
        text1: "QR Code invalide",
        text2: "Veuillez réessayer",
        type: "error",
      });
    }
  }
  if (!hasPermission)
    return (
      <Text>
        Veuillez accepter Mon livre de recettes à accéder à votre appareil photo
      </Text>
    );

  return (
    <View style={styles.container}>
      <BarCodeScanner style={styles.camera} onBarCodeScanned={onScan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", flex: 1 },
  camera: {
    width: Dimensions.get("screen").width,
    height: "100%",
  },
});
