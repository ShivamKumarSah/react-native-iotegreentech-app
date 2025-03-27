import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Droplets, Thermometer, Sun, Wind } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import React from 'react';

export default function Dashboard() {
  const sensorData = {
    moisture: 65,
    temperature: 24,
    light: 80,
    humidity: 55,
  };

  const chartData = {
    labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    datasets: [
      {
        data: [65, 68, 70, 72, 68, 65],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#2F9E44', '#40C057']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Plant Dashboard</Text>
        <Text style={styles.headerSubtitle}>All systems normal</Text>
      </LinearGradient>

      <View style={styles.sensorGrid}>
        <View style={styles.sensorCard}>
          <Droplets size={24} color="#2F9E44" />
          <Text style={styles.sensorValue}>{sensorData.moisture}%</Text>
          <Text style={styles.sensorLabel}>Moisture</Text>
        </View>
        <View style={styles.sensorCard}>
          <Thermometer size={24} color="#2F9E44" />
          <Text style={styles.sensorValue}>{sensorData.temperature}°C</Text>
          <Text style={styles.sensorLabel}>Temperature</Text>
        </View>
        <View style={styles.sensorCard}>
          <Sun size={24} color="#2F9E44" />
          <Text style={styles.sensorValue}>{sensorData.light}%</Text>
          <Text style={styles.sensorLabel}>Light</Text>
        </View>
        <View style={styles.sensorCard}>
          <Wind size={24} color="#2F9E44" />
          <Text style={styles.sensorValue}>{sensorData.humidity}%</Text>
          <Text style={styles.sensorLabel}>Humidity</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Temperature Trend</Text>
        <LineChart
          data={chartData}
          width={350}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(47, 158, 68, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  sensorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: '47%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sensorValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#212529',
    marginTop: 8,
  },
  sensorLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#868e96',
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#212529',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});