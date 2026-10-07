import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

function Statistics() {
  const words = useSelector(
    (state) => state.wordsLearning.words
  );

  const toLearn = words.filter((word) => word.status === 0).length;
  const inProcess = words.filter((word) => word.status === 1).length;
  const learned = words.filter((word) => word.status === 2).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistics</Text>

      <View style={styles.statisticsContainer}>
        <View style={styles.statistic}>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{toLearn}</Text>
          </View>

          <Text style={styles.label}>To learn</Text>
        </View>

        <View style={styles.statistic}>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{inProcess}</Text>
          </View>

          <Text style={styles.label}>In process</Text>
        </View>

        <View style={styles.statistic}>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{learned}</Text>
          </View>

          <Text style={styles.label}>Learned</Text>
        </View>
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
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
  },

  statisticsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "100%",
  },

  statistic: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  valueContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  value: {
    fontSize: 32,
    fontWeight: "700",
  },

  label: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Statistics;