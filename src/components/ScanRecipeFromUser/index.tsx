import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "../../hooks/useNavigation";
import { useDuplicateRecipe } from "../../services/recipes";
import { TQrCode } from "../../types/recipe";
import { sleep } from "../../utils/promise";

interface ScanRecipeFromUserProps {}

export function ScanRecipeFromUser(props: ScanRecipeFromUserProps) {
  const {} = props;
  const [isScanned, setIsScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(true);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await sleep(400);
      setIsLoading(true);
      setIsScanned(false);

      await getPermission();
      setIsLoading(false);
    })();
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

  if (isLoading)
    return (
      <View style={styles.container}>
        <View>
          <Text>Chargement de l'appareil photo</Text>
          <Text>Ca ne sera pas long, promis 😉</Text>
        </View>
      </View>
    );

  if (!hasPermission)
    return (
      <Text>
        Veuillez autoriser l'application à accéder à votre appareil photo
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
