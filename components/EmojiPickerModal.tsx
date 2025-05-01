import React, { memo } from "react";
import { type ImageSource } from "expo-image";

import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";

interface EmojiPickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: ImageSource) => void;
}

/**
 * Componente que muestra un modal con una lista de emojis para seleccionar
 * Utiliza memo para evitar renderizados innecesarios
 */
export const EmojiPickerModal = memo(
  ({ isVisible, onClose, onEmojiSelect }: EmojiPickerModalProps) => {
    return (
      <EmojiPicker isVisible={isVisible} onClose={onClose}>
        <EmojiList onSelect={onEmojiSelect} onCloseModal={onClose} />
      </EmojiPicker>
    );
  },
);

// Asigna un nombre para mostrar para ayudar en la depuración
EmojiPickerModal.displayName = "EmojiPickerModal";
