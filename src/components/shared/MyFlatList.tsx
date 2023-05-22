import { ReactNode } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

interface MyFlatListProps<T> {
  data: T[];
  item(i: T, itemWidth: number): ReactNode;
  style?: any;
  colNumber?: number;
  rowGap?: number;
  colGap?: number;
}

export function MyFlatList<T>(props: MyFlatListProps<T>) {
  const { data, item, style, colNumber = 2, rowGap = 10, colGap = 10 } = props;

  const width =
    (Dimensions.get("window").width - 30 - colGap * colNumber) / colNumber;

  return (
    <View style={{ ...styles.container, ...style }}>
      {data.map((d, i) => (
        <View
          key={(d as any).id ?? i}
          style={{ marginVertical: rowGap / 2, marginHorizontal: colGap / 2 }}
        >
          {item(d, width)}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 40,
    paddingLeft: "auto",
  },
});
