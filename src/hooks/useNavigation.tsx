import { useNavigation as useNav } from "@react-navigation/native";

export function useNavigation() {
  const navigation = useNav();

  function navigate(path: string, options?: any) {
    // @ts-ignore
    navigation.navigate(path, options);
  }

  return { ...navigation, navigate };
}
