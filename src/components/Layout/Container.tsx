import { DocumentNode, useApolloClient } from "@apollo/client";
import { ReactNode, useCallback, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  ScrollViewProps,
} from "react-native";
import { background } from "../../theme/colors";

interface ContainerProps extends ScrollViewProps {
  children: ReactNode;
  queryToRefetch?: DocumentNode | DocumentNode[] | string | string[];
  onRefresh?(): void;
}

export function Container(props: ContainerProps) {
  const {
    children,
    queryToRefetch,
    style,
    onRefresh: onRefreshProps,
    ...rest
  } = props;

  const [refreshing, setRefreshing] = useState(false);

  const client = useApolloClient();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    (async () => {
      try {
        await client.refetchQueries({
          include: Array.isArray(queryToRefetch)
            ? queryToRefetch
            : [queryToRefetch!],
        });
        onRefreshProps?.();
      } catch {}
      setRefreshing(false);
    })();
  }, [queryToRefetch]);

  return (
    <ScrollView
      {...rest}
      style={[styles.container, style]}
      {...(queryToRefetch && {
        refreshControl: (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ),
      })}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});
