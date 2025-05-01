import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";

interface EditorOptionsProps {
  onReset: () => void;
  onAddSticker: () => void;
  onSaveImage: () => void;
}

/**
 * Componente que muestra las opciones disponibles durante la edición de una imagen
 * Utiliza memo para evitar renderizados innecesarios
 */
export const EditorOptions = memo(
  ({ onReset, onAddSticker, onSaveImage }: EditorOptionsProps) => {
    return (
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          {/* Botón para reiniciar la edición */}
          <IconButton icon="refresh" label="Reset" onPress={onReset} />

          {/* Botón circular para añadir stickers de emoji */}
          <CircleButton onPress={onAddSticker} />

          {/* Botón para guardar la imagen editada */}
          <IconButton icon="save-alt" label="Save" onPress={onSaveImage} />
        </View>
      </View>
    );
  },
);

// Asigna un nombre para mostrar para ayudar en la depuración
EditorOptions.displayName = "EditorOptions";

const styles = StyleSheet.create({
  optionsContainer: {
    bottom: 80,
    position: "absolute",
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
