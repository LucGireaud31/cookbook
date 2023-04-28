import { memo, useEffect, useMemo, useState } from "react";
import { Animated, Easing, StyleProp, ViewStyle } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useIngredients } from "../../../services/ingredients";
import { theme } from "../../../theme/colors";
import { randomNumberBetween } from "../../../utils/number";

interface SpinnerProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  icon?: boolean;
}

function SpinnerMemo(props: SpinnerProps) {
  const { size = 40, style, icon = true } = props;
  let spinValue = new Animated.Value(0);

  const { data: ingredients } = useIngredients();

  const image = useMemo(() => {
    const randomIndex = randomNumberBetween(1, ingredients?.length ?? 0) - 1;
    return ingredients?.[randomIndex].image;
  }, [ingredients]);

  const [render, setRender] = useState<any>();

  useEffect(() => {
    (function rotate() {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(rotate);
    })();

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
    setRender(
      <Animated.Image
        source={{ uri: image }}
        style={{
          transform: [{ rotate: spin }],
          width: size,
          height: size,
          ...(style as any),
        }}
      />
    );
  }, [ingredients]);

  return icon ? (
    render
  ) : (
    <ActivityIndicator animating={true} color={theme[400]} size={size} />
  );
}

export const Spinner = memo(SpinnerMemo, (prev, next) => {
  return prev.size != next.size;
});

/*
import { memo } from "react";
import { Animated, Easing } from "react-native";

interface SpinnerProps {
  size?: number;
}

function SpinnerMemo(props: SpinnerProps) {
  const { size = 35 } = props;
  let spinValue = new Animated.Value(0);

  function rotate() {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(rotate);
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  rotate();

  return (
    <Animated.Image
      source={require("./pizza.png")}
      style={{ transform: [{ rotate: spin }], width: size, height: size }}
    />
  );
}

export const Spinner = memo(SpinnerMemo, (prev, next) => {
  return prev.size != next.size;
});
*/
