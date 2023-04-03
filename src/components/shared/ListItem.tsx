import { ReactNode } from "react";
import { View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import { theme } from "../../theme/colors";
import { XIcon } from "../icons/icons";
import { IconButton } from "./IconButton";

interface ListItemProps {
  leftIcon?: ReactNode;
  onDelete?(): void;
  label: string;
  rightLabel?: string;
  leftColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function ListItem(props: ListItemProps) {
  const { leftIcon, onDelete, label, rightLabel, leftColor, style } = props;

  return (
    <View style={[styles.itemContainer, style]}>
      <View
        style={[
          styles.itemImgContainer,
          { backgroundColor: leftColor ?? theme[400] },
        ]}
      >
        {leftIcon}
      </View>
      <View style={styles.itemLabelContainer}>
        <View style={{ ...styles.itemLabel, width: onDelete ? "80%" : "90%" }}>
          <Text style={styles.itemLabelLeft}>{label}</Text>
          <Text style={styles.itemLabelRight}>{rightLabel}</Text>
        </View>
        {onDelete && (
          <IconButton
            style={styles.iconContainer}
            icon={<XIcon size={30} />}
            onPress={(e) => {
              e.preventDefault();
              onDelete?.();
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    marginVertical: 8,
  },
  itemImgContainer: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    height: "100%",
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemLabelContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    height: "100%",
    alignItems: "center",
    width: "80%",
    justifyContent: "space-between",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingLeft: 15,
  },
  itemImg: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginLeft: 5,
  },
  itemLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemLabelLeft: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemLabelRight: {
    fontSize: 16,
  },
  iconContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    paddingHorizontal: 10,
  },
});
