import React, { useState, useRef } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

const configuration = {
  apiKey: 'AIzaSyBrn-eR0EK78eanlKNN8771AT0N9wYfegg',
  endpoint:
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
};

async function sendToGemini(base64Image: string, prompt: string): Promise<string> {
  try {
    // Remove the base64 header if present.
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
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    // Permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Permissions have not been granted.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function handleCapture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
        setCapturedImage(photo.uri);
        setLoading(true);
        // Send the captured image along with the predefined prompt.
        const geminiResponse = await sendToGemini(photo.base64, 'You are a professional agriculture specialist. I will provide you with an image of a plant. Your task is to identify the plant and its scientific name. If you are unsure, mention that you are not certain but suggest the most likely plant species. If the plant is healthy, describe its benefits and common uses. If the plant appears unhealthy, diagnose the issue, identify any diseases, and provide a detailed professional recommendation for treatment, including possible cures and preventive measures. If the image is not of a plant, respond by saying that you are an AI plant expert and can only assist with plant-related inquiries. important: strictly do not use * to stylize the text.');
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

  // If an image was captured, show its preview and the Gemini API response.
  if (capturedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        {loading ? (
          <ActivityIndicator size="large" color="#2F9E44" />
        ) : (
          <Text style={styles.responseText}>{responseText}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleRetake}>
          <Text style={styles.text}>Retake</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Otherwise, show the camera view with flip and capture buttons.
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCapture}>
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#000',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 64,
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#2F9E44',
    padding: 12,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  previewImage: {
    flex: 1,
    width: '100%',
  },
  responseText: {
    color: '#fff',
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
  },
});
