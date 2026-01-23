import { useFormik } from "formik";
import * as Yup from "yup";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Switch,
  Text,
  HelperText,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

export default function ContactForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      program: 0,
      message: "",
      agree: false,
    },

    onSubmit: (values) => {},
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      email: Yup.string().required("Required.").email("Invalid email"),
      phone: Yup.number().integer().typeError("Please enter a valid number"),
      program: Yup.number().integer().typeError("Please select a program."),
      message: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
      agree: Yup.boolean().oneOf(
        [true],
        "The terms and conditions must be accepted."
      ),
    }),
  });

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Name"
        mode="outlined"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        error={formik.touched.name && formik.errors.name}
        style={styles.input}
      />
      {formik.touched.name && formik.errors.name && (
        <HelperText type="error">{formik.errors.name}</HelperText>
      )}

      <TextInput
        label="Email"
        mode="outlined"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        error={formik.touched.email && formik.errors.email}
        keyboardType="email-address"
        style={styles.input}
      />
      {formik.touched.email && formik.errors.email && (
        <HelperText type="error">{formik.errors.email}</HelperText>
      )}

      <TextInput
        label="Phone"
        mode="outlined"
        value={formik.values.phone}
        onChangeText={formik.handleChange("phone")}
        onBlur={formik.handleBlur("phone")}
        error={formik.touched.phone && formik.errors.phone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      {formik.touched.phone && formik.errors.phone && (
        <HelperText type="error">{formik.errors.phone}</HelperText>
      )}

      <Text style={styles.label}>Program of Study</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formik.values.program}
          onValueChange={(value) => formik.setFieldValue("program", value)}
        >
          <Picker.Item label="Please select" value={0} />
          <Picker.Item label="Software Engineering" value={1} />
          <Picker.Item label="Information System" value={2} />
          <Picker.Item label="Information Assurance" value={3} />
          <Picker.Item label="Internet of Things" value={4} />
          <Picker.Item label="Artificial Intelligence" value={5} />
          <Picker.Item label="Digital Art & Design" value={6} />
        </Picker>
      </View>

      <TextInput
        label="Message"
        mode="outlined"
        value={formik.values.message}
        onChangeText={formik.handleChange("message")}
        onBlur={formik.handleBlur("message")}
        error={formik.touched.message && formik.errors.message}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      {formik.touched.message && formik.errors.message && (
        <HelperText type="error">{formik.errors.message}</HelperText>
      )}

      <View style={styles.switchContainer}>
        <Switch
          value={formik.values.agree}
          onValueChange={(value) => formik.setFieldValue("agree", value)}
        />
        <Text style={styles.switchLabel}>Agree to terms and conditions.</Text>
      </View>
      {formik.touched.agree && formik.errors.agree && (
        <HelperText type="error">{formik.errors.agree}</HelperText>
      )}

      <Button
        mode="contained"
        onPress={formik.handleSubmit}
        style={styles.button}
      >
        Send
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  input: {
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  switchLabel: {
    marginLeft: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
  },
});
