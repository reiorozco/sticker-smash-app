import { useEffect } from "react";
import * as MediaLibrary from "expo-media-library";

export function useMediaPermissions() {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  // Solicita permisos al montar el componente si aún no se han concedido
  useEffect(() => {
    const checkAndRequestPermissions = async () => {
      if (status === null) {
        await requestPermission();
      }
    };

    void checkAndRequestPermissions();
  }, [status, requestPermission]);

  return status;
}
