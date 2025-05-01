import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

import Button from "@/components/Button";

interface WelcomeFooterProps {
  onPickImage: () => void;
}

/**
 * Componente que muestra los botones de la pantalla de bienvenida
 * Utiliza memo para evitar renderizados innecesarios
 */
export const WelcomeFooter = memo(({ onPickImage }: WelcomeFooterProps) => {
  return (
    <View style={styles.footerContainer}>
      {/* Botón principal para elegir una foto de la galería */}
      <Button theme="primary" label="Choose a photo" onPress={onPickImage} />

      {/* Botón secundario - podría activarse para usar la imagen actual 
          o implementar funcionalidad adicional en el futuro */}
      <Button
        label="Use this photo"
        onPress={() => {
          // Esta funcionalidad podría implementarse en el futuro
          // Por ejemplo, para usar la imagen de placeholder como base
        }}
      />
    </View>
  );
});

// Asigna un nombre para mostrar para ayudar en la depuración
WelcomeFooter.displayName = "WelcomeFooter";

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: "center",
    flex: 1 / 3,
  },
});
