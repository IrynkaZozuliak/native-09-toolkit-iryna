import { View, StyleSheet, Text, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/themeSlice";

function Settings() {
  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.theme.isDark);
  const colors = useSelector((state) => state.theme.colors);

  function onThemeChange() {
    dispatch(themeActions.toggle());
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.appBackground,
      }}
    >
      <Text
        style={{
          ...styles.title,
          color: colors.fontMain,
        }}
      >
        Choose color theme:
      </Text>

      <View style={styles.themeContainer}>
        <Text
          style={{
            ...styles.themeText,
            color: colors.fontMain,
          }}
        >
          Light
        </Text>

        <Switch
          value={isDark}
          onValueChange={onThemeChange}
        />

        <Text
          style={{
            ...styles.themeText,
            color: colors.fontMain,
          }}
        >
          Dark
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 30,
  },

  themeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  themeText: {
    fontSize: 18,
  },
});

export default Settings;