import AsyncStorage from "@react-native-async-storage/async-storage";
const handleLogout = () => {
   await AsyncStorage.setItem('idToken', '')
   await AsyncStorage.setItem('refreshToken', '')
   alert("Logged out successfully!");
};

export default handleLogout;