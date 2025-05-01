import { useCallback } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { type ImageSource } from "expo-image";

// Importación de hooks personalizados
import { useImageEditor } from "@/hooks/useImageEditor";
import { useMediaPermissions } from "@/hooks/useMediaPermissions";

// Importación de componentes
import { EditorOptions } from "@/components/editor/EditorOptions";
import { ImageCanvas } from "@/components/editor/ImageCanvas";
import { WelcomeFooter } from "@/components/editor/WelcomeFooter";
import { EmojiPickerModal } from "@/components/EmojiPickerModal";

// Imagen de fondo predeterminada
const PlaceholderImage = require("@/assets/images/background-image.png");

/**
 * Componente principal de la aplicación
 */
export default function Index() {
  // Hook para gestionar permisos de acceso a la galería
  useMediaPermissions();

  // Hook que gestiona toda la lógica de edición de imágenes
  const {
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
  } = useImageEditor();

  // Callback para seleccionar un emoji y cerrar el modal
  const handleEmojiSelect = useCallback(
    (emoji: ImageSource) => {
      setPickedEmoji(emoji);
      onModalClose();
    },
    [setPickedEmoji, onModalClose],
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Área de visualización y edición de la imagen */}
      <View style={styles.imageContainer}>
        <ImageCanvas
          ref={imageRef}
          placeholderImage={PlaceholderImage}
          selectedImage={selectedImage}
          pickedEmoji={pickedEmoji}
        />
      </View>

      {/* Renderizado condicional basado en el estado de la aplicación */}
      {showAppOptions ? (
        // Opciones de edición cuando hay una imagen seleccionada
        <EditorOptions
          onReset={onReset}
          onAddSticker={onAddSticker}
          onSaveImage={onSaveImageAsync}
        />
      ) : (
        // Pantalla de bienvenida cuando no hay imagen seleccionada
        <WelcomeFooter onPickImage={pickImageAsync} />
      )}

      {/* Modal para seleccionar emojis */}
      <EmojiPickerModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        onEmojiSelect={handleEmojiSelect}
      />
    </GestureHandlerRootView>
  );
}

/**
 * Estilos para el componente principal
 */
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#25292e",
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
});
