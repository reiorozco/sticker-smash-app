import React, { forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import { type ImageSource } from "expo-image";

import ImageViewer from "@/components/ImageViewer";
import EmojiSticker from "@/components/EmojiSticker";

interface ImageCanvasProps {
  placeholderImage: any;
  selectedImage?: string;
  pickedEmoji?: ImageSource;
}

/**
 * Componente que sirve como lienzo para la edición de imágenes
 * Utiliza forwardRef para pasar la referencia del componente al padre
 */
export const ImageCanvas = forwardRef<View, ImageCanvasProps>(
  ({ placeholderImage, selectedImage, pickedEmoji }, ref) => {
    return (
      <View ref={ref} collapsable={false} style={styles.canvas}>
        {/* Visualizador de imágenes (muestra la imagen seleccionada o el placeholder) */}
        <ImageViewer
          imgSource={placeholderImage}
          selectedImage={selectedImage}
        />

        {/* Muestra el emoji seleccionado como sticker si existe */}
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
    );
  },
);

// Asigna un nombre para mostrar para ayudar en la depuración
ImageCanvas.displayName = "ImageCanvas";

const styles = StyleSheet.create({
  canvas: {
    // Estilos específicos para el lienzo si son necesarios
  },
});
