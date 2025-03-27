import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Cloud, CloudRain, CloudSun, Sun, Thermometer, Wind, Droplets } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherIcon } from '@/components/WeatherIcon';

// Mock weather data (in a real app, this would come from a weather API)
const weatherData = {
  current: {
    temp: 22,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    icon: CloudSun,
  },
  hourly: [
    { time: '9 AM', temp: 20, icon: Cloud },
    { time: '10 AM', temp: 21, icon: CloudSun },
    { time: '11 AM', temp: 22, icon: Sun },
    { time: '12 PM', temp: 23, icon: Sun },
    { time: '1 PM', temp: 23, icon: CloudSun },
    { time: '2 PM', temp: 22, icon: CloudRain },
  ],
  plantCare: [
    {
      title: 'Watering Adjustments',
      description: 'Light rain expected. Consider skipping today\'s watering schedule.',
      icon: Droplets,
    },
    {
      title: 'Sun Protection',
      description: 'Strong UV index forecasted. Move sensitive plants to partial shade.',
      icon: Sun,
    },
    {
      title: 'Humidity Alert',
      description: 'Humidity levels optimal for tropical plants. No action needed.',
      icon: CloudRain,
    },
  ],
};

export default function WeatherScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#2F9E44', '#40C057']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Weather & Plant Care</Text>
        <Text style={styles.headerSubtitle}>Today's Forecast</Text>
      </LinearGradient>

      <View style={styles.currentWeather}>
        <View style={styles.currentMain}>
          <WeatherIcon icon={weatherData.current.icon} size={64} color="#2F9E44" />
          <Text style={styles.temperature}>{weatherData.current.temp}°C</Text>
          <Text style={styles.condition}>{weatherData.current.condition}</Text>
        </View>

        <View style={styles.currentDetails}>
          <View style={styles.detailItem}>
            <WeatherIcon icon={Wind} size={24} color="#666666" />
            <Text style={styles.detailValue}>{weatherData.current.windSpeed} km/h</Text>
            <Text style={styles.detailLabel}>Wind</Text>
          </View>
          <View style={styles.detailItem}>
            <WeatherIcon icon={Droplets} size={24} color="#666666" />
            <Text style={styles.detailValue}>{weatherData.current.humidity}%</Text>
            <Text style={styles.detailLabel}>Humidity</Text>
          </View>
        </View>
      </View>

      <View style={styles.hourlyContainer}>
        <Text style={styles.sectionTitle}>Hourly Forecast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
          {weatherData.hourly.map((hour, index) => (
            <View key={index} style={styles.hourlyItem}>
              <Text style={styles.hourlyTime}>{hour.time}</Text>
              <WeatherIcon icon={hour.icon} size={32} color="#2F9E44" />
              <Text style={styles.hourlyTemp}>{hour.temp}°C</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.careContainer}>
        <Text style={styles.sectionTitle}>Plant Care Recommendations</Text>
        {weatherData.plantCare.map((care, index) => (
          <View key={index} style={styles.careCard}>
            <WeatherIcon icon={care.icon} size={32} color="#2F9E44" />
            <View style={styles.careContent}>
              <Text style={styles.careTitle}>{care.title}</Text>
              <Text style={styles.careDescription}>{care.description}</Text>
            </View>
          </View>
        ))}
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
  currentWeather: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  currentMain: {
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 48,
    color: '#212529',
    marginVertical: 8,
  },
  condition: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: '#495057',
  },
  currentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 20,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailValue: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#212529',
    marginVertical: 4,
  },
  detailLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#868e96',
  },
  hourlyContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#212529',
    marginBottom: 16,
  },
  hourlyScroll: {
    flexDirection: 'row',
  },
  hourlyItem: {
    alignItems: 'center',
    marginRight: 24,
    minWidth: 60,
  },
  hourlyTime: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  hourlyTemp: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#212529',
    marginTop: 8,
  },
  careContainer: {
    margin: 16,
    marginBottom: 32,
  },
  careCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
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
  careContent: {
    flex: 1,
    marginLeft: 16,
  },
  careTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#212529',
    marginBottom: 4,
  },
  careDescription: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#495057',
  },
});