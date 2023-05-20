import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { background, theme } from "../../theme/colors";
import { HomeIcon, PlusIcon, ShopIcon } from "../../components/icons/icons";
import { ReactNode } from "react";
import { useNavigation } from "../../hooks/useNavigation";

const HOME_METRICS = {
  padding: 8,
  iconSize: 40,
  borderWidth: 3,
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      <View />
      <RouteIcon
        label="Courses"
        isSelected={state.index == 2}
        icon={<ShopIcon />}
        selectedIcon={<ShopIcon isFilled={true} />}
        routeName="shop"
      />
      <View>
        <TouchableHighlight
          style={styles.homeButton}
          underlayColor={background}
          onPress={() => {
            navigation.navigate("home");
            navigation.goBack();
            navigation.goBack();
          }}
        >
          <HomeIcon
            size={HOME_METRICS.iconSize}
            weight={state.index == 0 ? "normal" : "light"}
          />
        </TouchableHighlight>
      </View>
      <RouteIcon
        label="Recette"
        icon={<PlusIcon color="white" />}
        selectedIcon={<PlusIcon color="white" weight={"bold"} />}
        isSelected={state.index == 1}
        routeName="createRecipe"
      />
      <View />
    </View>
  );
}

function RouteIcon({
  label,
  icon,
  routeName,
  selectedIcon,
  isSelected,
}: {
  label: string;
  icon: ReactNode;
  selectedIcon: ReactNode;
  isSelected: boolean;
  routeName: string;
}) {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigate(routeName);
      }}
    >
      <View style={styles.routeIconContainer}>
        {isSelected ? selectedIcon : icon}
        <Text
          style={{
            ...styles.routeIconLabel,
            ...(isSelected && { fontWeight: "bold" }),
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme[400],
    height: 60,
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    justifyContent: "space-around",
  },
  homeButton: {
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: HOME_METRICS.borderWidth,
    padding: HOME_METRICS.padding,
    borderColor: theme[400],

    top: -20,
  },
  routeIconContainer: {
    alignItems: "center",
  },
  routeIconLabel: {
    color: "white",
    fontSize: 11,
  },
});
