import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import { useTheme } from "../hooks/useTheme";
import { useProfile } from "../hooks/useProfile";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { profileValidationSchema } from "../utils/validation";
import { LinearGradient } from "expo-linear-gradient";

const EditProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { profile, updateProfile } = useProfile();

  const handleSubmit = (values) => {
    updateProfile({
      name: values.name,
      bio: values.bio,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerSpacer} />

        <View style={styles.avatarSection}>
          <LinearGradient colors={colors.primary} style={styles.avatarGradient}>
            <Text style={styles.avatarText}>
              {profile.name.charAt(0).toUpperCase()}
            </Text>
          </LinearGradient>
          <Text style={[styles.avatarHint, { color: colors.textSecondary }]}>
            Change profile photo
          </Text>
        </View>

        <Formik
          initialValues={{
            name: profile.name,
            bio: profile.bio,
          }}
          validationSchema={profileValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View style={styles.form}>
              <Input
                label="Full Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                placeholder="Ex. John Doe"
                error={touched.name && errors.name}
              />

              <Input
                label="Bio"
                value={values.bio}
                onChangeText={handleChange("bio")}
                onBlur={handleBlur("bio")}
                placeholder="Tell us a bit about yourself..."
                multiline
                numberOfLines={4}
                error={touched.bio && errors.bio}
              />

              <View style={styles.charCount}>
                <Text
                  style={[
                    styles.charCountText,
                    { color: colors.textSecondary },
                  ]}
                >
                  {values.bio.length}/150
                </Text>
              </View>

              <View style={styles.buttons}>
                <Button
                  title="Save Changes"
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSpacer: {
    height: 20,
  },
  content: {
    padding: 24,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  avatarHint: {
    fontSize: 14,
    fontWeight: "500",
  },
  form: {
    gap: 8,
  },
  charCount: {
    alignItems: "flex-end",
    marginTop: -8,
    marginBottom: 32,
  },
  charCountText: {
    fontSize: 12,
    fontWeight: "600",
  },
  buttons: {
    marginTop: 8,
  },
});

export default EditProfileScreen;
