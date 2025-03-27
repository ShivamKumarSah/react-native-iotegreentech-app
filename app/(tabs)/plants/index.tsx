import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Droplets, Thermometer, Sun } from 'lucide-react-native';

const plants = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    health: 'Excellent',
    healthScore: 95,
    lastWatered: '2 days ago',
    optimalConditions: {
      moisture: '65-75%',
      temperature: '20-25°C',
      light: 'Bright indirect'
    }
  },
  {
    id: '2',
    name: 'Snake Plant',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e8a76?auto=format&fit=crop&w=800&q=80',
    health: 'Good',
    healthScore: 85,
    lastWatered: '5 days ago',
    optimalConditions: {
      moisture: '40-50%',
      temperature: '18-27°C',
      light: 'Low to bright indirect'
    }
  },
  {
    id: '3',
    name: 'Peace Lily',
    image: 'https://images.unsplash.com/photo-1593691509544-0635b56ad791?auto=format&fit=crop&w=800&q=80',
    health: 'Needs Attention',
    healthScore: 70,
    lastWatered: '7 days ago',
    optimalConditions: {
      moisture: '60-70%',
      temperature: '18-30°C',
      light: 'Low to moderate'
    }
  }
];

function getHealthColor(score: number) {
  if (score >= 90) return '#2F9E44';
  if (score >= 80) return '#40C057';
  if (score >= 70) return '#FCC419';
  return '#FA5252';
}

export default function PlantsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Plants</Text>
        <Text style={styles.headerSubtitle}>Monitoring {plants.length} plants</Text>
      </View>

      <View style={styles.plantsGrid}>
        {plants.map((plant) => (
          <Link href={`/plants/${plant.id}`} key={plant.id} asChild>
            <Pressable style={styles.plantCard}>
              <Image
                source={{ uri: plant.image }}
                style={styles.plantImage}
              />
              <View style={styles.plantInfo}>
                <Text style={styles.plantName}>{plant.name}</Text>
                <View style={styles.healthContainer}>
                  <View
                    style={[
                      styles.healthIndicator,
                      { backgroundColor: getHealthColor(plant.healthScore) }
                    ]}
                  />
                  <Text style={styles.healthText}>{plant.health}</Text>
                </View>
                <View style={styles.conditionsContainer}>
                  <View style={styles.condition}>
                    <Droplets size={16} color="#666666" />
                    <Text style={styles.conditionText}>{plant.optimalConditions.moisture}</Text>
                  </View>
                  <View style={styles.condition}>
                    <Thermometer size={16} color="#666666" />
                    <Text style={styles.conditionText}>{plant.optimalConditions.temperature}</Text>
                  </View>
                  <View style={styles.condition}>
                    <Sun size={16} color="#666666" />
                    <Text style={styles.conditionText}>{plant.optimalConditions.light}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </Link>
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 28,
    color: '#212529',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#868e96',
  },
  plantsGrid: {
    padding: 16,
  },
  plantCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plantImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  plantInfo: {
    padding: 16,
  },
  plantName: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#212529',
    marginBottom: 8,
  },
  healthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  healthText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#495057',
  },
  conditionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 12,
  },
  condition: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  conditionText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#495057',
  },
});