// import {
//   Button,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

// const Demo = () => {
//   const [cameraType, setCameraType] = useState<CameraType>("front");

//   const [status, requestPermission] = useCameraPermissions();
//   const [picUri, setpicUri] = useState("");
//   const cameraRef = useRef<CameraView>();

//   if (!status) {
//     return <View />;
//   }
//   if (!status.granted) {
//     return (
//       <View style={styles.container}>
//         <Text>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   const captureAsync = async () => {
//     const pic = await cameraRef.current?.takePictureAsync();
//     if (pic) {
//       setpicUri(pic?.uri);
//     }
//     console.debug(pic);
//   };

//   return (
//     <View style={styles.container}>
//       <View>
//         <CameraView ref={cameraRef} style={{ height: 400, width: 300 }} />
//         {picUri && (
//           <Image
//             source={{ uri: picUri }}
//             style={{ width: 300, height: 300, resizeMode: "contain" }}
//           />
//         )}
//         <Button title="Capture" onPress={captureAsync} />
//       </View>
//     </View>
//   );
// };

// export default Demo;

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: "center", justifyContent: "center" },
// });
