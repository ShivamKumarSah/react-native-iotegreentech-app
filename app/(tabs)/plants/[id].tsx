import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Droplets, Thermometer, Sun, Wind, Activity } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';

const plants = {
  '1': {
    id: '1',
    name: 'Monstera Deliciosa',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    health: 'Excellent',
    healthScore: 95,
    lastWatered: '2 days ago',
    nextWatering: 'Tomorrow',
    optimalConditions: {
      moisture: '65-75%',
      temperature: '20-25°C',
      light: 'Bright indirect',
      humidity: '60-80%'
    },
    currentConditions: {
      moisture: 70,
      temperature: 23,
      light: 75,
      humidity: 65
    },
    history: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [65, 68, 70, 72, 68, 65, 70],
        },
      ],
    },
    care: [
      'Water when top 2-3 inches of soil feels dry',
      'Maintain humidity above 60%',
      'Rotate plant quarterly for even growth',
      'Clean leaves monthly with damp cloth',
      'Fertilize monthly during growing season'
    ]
  },
  // Add other plants here...
};

export default function PlantDetails() {
  const { id } = useLocalSearchParams();
  const plant = plants[id as keyof typeof plants];

  if (!plant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Plant not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#212529" />
        </Pressable>
        <Image source={{ uri: plant.image }} style={styles.plantImage} />
      </View>

      <View style={styles.content}>
        <Text style={styles.plantName}>{plant.name}</Text>
        
        <View style={styles.healthSection}>
          <View style={styles.healthScore}>
            <Activity size={24} color="#2F9E44" />
            <Text style={styles.healthScoreText}>{plant.healthScore}%</Text>
            <Text style={styles.healthLabel}>Health Score</Text>
          </View>
          <View style={styles.wateringInfo}>
            <Text style={styles.wateringLabel}>Last Watered</Text>
            <Text style={styles.wateringText}>{plant.lastWatered}</Text>
            <Text style={styles.wateringLabel}>Next Watering</Text>
            <Text style={styles.wateringText}>{plant.nextWatering}</Text>
          </View>
        </View>

        <View style={styles.conditionsGrid}>
          <View style={styles.conditionCard}>
            <Droplets size={24} color="#2F9E44" />
            <Text style={styles.conditionValue}>{plant.currentConditions.moisture}%</Text>
            <Text style={styles.conditionLabel}>Moisture</Text>
            <Text style={styles.conditionOptimal}>Optimal: {plant.optimalConditions.moisture}</Text>
          </View>
          <View style={styles.conditionCard}>
            <Thermometer size={24} color="#2F9E44" />
            <Text style={styles.conditionValue}>{plant.currentConditions.temperature}°C</Text>
            <Text style={styles.conditionLabel}>Temperature</Text>
            <Text style={styles.conditionOptimal}>Optimal: {plant.optimalConditions.temperature}</Text>
          </View>
          <View style={styles.conditionCard}>
            <Sun size={24} color="#2F9E44" />
            <Text style={styles.conditionValue}>{plant.currentConditions.light}%</Text>
            <Text style={styles.conditionLabel}>Light</Text>
            <Text style={styles.conditionOptimal}>Optimal: {plant.optimalConditions.light}</Text>
          </View>
          <View style={styles.conditionCard}>
            <Wind size={24} color="#2F9E44" />
            <Text style={styles.conditionValue}>{plant.currentConditions.humidity}%</Text>
            <Text style={styles.conditionLabel}>Humidity</Text>
            <Text style={styles.conditionOptimal}>Optimal: {plant.optimalConditions.humidity}</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Moisture Trends</Text>
          <LineChart
            data={plant.history}
            width={350}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(47, 158, 68, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.careSection}>
          <Text style={styles.sectionTitle}>Care Instructions</Text>
          {plant.care.map((instruction, index) => (
            <View key={index} style={styles.careItem}>
              <View style={styles.careBullet} />
              <Text style={styles.careText}>{instruction}</Text>
            </View>
          ))}
        </View>
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
  },
  plantImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  plantName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#212529',
    marginBottom: 20,
  },
  healthSection: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  healthScore: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e5e5e5',
  },
  healthScoreText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: '#2F9E44',
    marginVertical: 8,
  },
  healthLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#868e96',
  },
  wateringInfo: {
    flex: 1,
    paddingLeft: 20,
  },
  wateringLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#868e96',
    marginBottom: 4,
  },
  wateringText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#212529',
    marginBottom: 12,
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  conditionCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
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
  conditionValue: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#212529',
    marginTop: 8,
  },
  conditionLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#868e96',
    marginTop: 4,
  },
  conditionOptimal: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#2F9E44',
    marginTop: 8,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  careSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  careItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  careBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2F9E44',
    marginRight: 12,
  },
  careText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#495057',
    flex: 1,
  },
  errorText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#FA5252',
    textAlign: 'center',
    marginTop: 20,
  },
});