import React, { useState, useRef } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const configuration = {
  apiKey: 'AIzaSyBrn-eR0EK78eanlKNN8771AT0N9wYfegg',
  endpoint:
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
};

async function sendToGemini(base64Image: string, prompt: string): Promise<string> {
  try {
    const cleanBase64Image = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const response = await fetch(`${configuration.endpoint}?key=${configuration.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              { inline_data: { mime_type: 'image/jpeg', data: cleanBase64Image } },
            ],
          },
        ],
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      return `API Error: ${result.error?.message || 'Unknown error'}`;
    }
    return result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No description available';
  } catch (error) {
    return 'Error processing the image';
  }
}

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  async function handleCapture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
        setCapturedImage(photo.uri);
        setLoading(true);
        const geminiResponse = await sendToGemini(
          photo.base64,
          'You are a professional agriculture specialist. I will provide you with an image of a plant. Your task is to identify the plant and its scientific name. If you are unsure, mention that you are not certain but suggest the most likely plant species. If the plant is healthy, describe its benefits and common uses. If the plant appears unhealthy, diagnose the issue, identify any diseases, and provide a detailed professional recommendation for treatment, including possible cures and preventive measures. If the image is not of a plant, respond by saying that you are an AI plant expert and can only assist with plant-related inquiries.Important: strictly not use * to stylize the text.'
        );
        setResponseText(geminiResponse);
      } catch (error) {
        setResponseText('Error capturing the image');
      } finally {
        setLoading(false);
      }
    }
  }

  function handleRetake() {
    setCapturedImage(null);
    setResponseText('');
  }

  if (capturedImage) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={{ uri: capturedImage }} style={styles.previewImage} />
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#2F9E44" style={styles.loadingIndicator} />
          ) : (
            <Text style={styles.responseText}>{responseText}</Text>
          )}
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} />
      <TouchableOpacity style={styles.captureButton} onPress={handleCapture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2F9E44',
    borderWidth: 4,
    borderColor: '#fff',
  },
  card: {
    width: '90%',
    minHeight: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  responseText: {
    width: '90%',
    color: '#000',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
  retakeButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginBottom: 20,
  },
});
