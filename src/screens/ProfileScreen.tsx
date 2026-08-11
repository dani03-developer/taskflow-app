import { StyleSheet, Text, View } from "react-native";
import avatar from "../assets/avatar.webp";
import ProfileCard from "../components/ProfileCard";
import { textSize } from "../theme";
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      <ProfileCard
        name="Daniela Machaca"
        role="Desarrolladora Frontend"
        image={avatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
  },
  title: {
    fontSize: textSize.title,
    fontWeight: "bold",
  },
});

export default ProfileScreen;