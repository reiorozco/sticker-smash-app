import { useRef, useState } from "react";
import { Alert, Platform, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { type ImageSource } from "expo-image";
import domtoimage from "dom-to-image";

export function useImageEditor() {
  // Referencia al componente de vista que contiene la imagen
  const imageRef = useRef<View>(null);

  // Estado para almacenar la URI de la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  // Estado para controlar la visualización de las opciones de la aplicación
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  // Estado para controlar la visibilidad del modal de emojis
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // Estado para almacenar el emoji seleccionado
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined,
  );

  /**
   * Abre la galería y permite al usuario seleccionar una imagen
   */
  const pickImageAsync = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setShowAppOptions(true);
      } else {
        Alert.alert("Selection canceled", "You have not selected any images.");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "A problem occurred while selecting the image.");
    }
  };

  /**
   * Restablece la aplicación a su estado inicial
   */
  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(undefined);
  };

  /**
   * Abre el selector de stickers de emoji
   */
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  /**
   * Cierra el selector de stickers de emoji
   */
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  /**
   * Guarda la imagen editada en la galería o como descarga (en web)
   */
  const onSaveImageAsync = async () => {
    if (!imageRef.current) {
      Alert.alert("Error", "Image reference not found");
      return;
    }

    try {
      if (Platform.OS !== "web") {
        // Captura la vista de la imagen en dispositivos móviles
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        // Guarda en la galería de imágenes
        await MediaLibrary.saveToLibraryAsync(localUri);
        Alert.alert("¡Success!", "Image successfully saved to your gallery");
      } else {
        // Captura y descarga la imagen en plataforma web
        const dataUrl = await domtoimage.toJpeg(
          imageRef.current as unknown as HTMLElement,
          {
            quality: 0.95,
            width: 320,
            height: 440,
          },
        );

        // Crea un enlace de descarga
        const link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();

        Alert.alert("¡Success!", "Image downloaded successfully");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      Alert.alert("Error", "The image could not be saved. Please try again.");
    }
  };

  return {
    imageRef,
    selectedImage,
    showAppOptions,
    isModalVisible,
    pickedEmoji,
    pickImageAsync,
    onReset,
    onAddSticker,
    onModalClose,
    onSaveImageAsync,
    setPickedEmoji,
  };
}
