import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import styles from "./ContactForm.module.css";

const ContactForm = ({ onAddContact }) => {
  const [phone, setPhone] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    number: Yup.string()
      .matches(
        /^\d{3}-\d{2}-\d{2}$/,
        "Phone number must be in the format XXX-XX-XX"
      )
      // .min(7, "Number must be at least 7 digits")
      // .max(9, "Number must be less than 8 digits")
      .required("Number is required"),
  });

  const formatPhone = (phoneValue) => {
    phoneValue = phoneValue.replace(/\D/g, ""); // Убираем символы

    // Форматируем номер телефона с дефисами
    if (phoneValue.length <= 3) {
      return phoneValue.replace(/(\d{3})(\d{0,2})/, "$1-$2");
    } else if (phoneValue.length <= 5) {
      return phoneValue.replace(/(\d{3})(\d{2})(\d{0,2})/, "$1-$2-$3");
    } else if (phoneValue.length <= 7) {
      return phoneValue.replace(/(\d{3})(\d{2})(\d{2})(\d{0,2})/, "$1-$2-$3");
    } else {
      phoneValue = phoneValue.slice(0, 9);
      return phoneValue.replace(/(\d{3})(\d{2})(\d{2})(\d{0,2})/, "$1-$2-$3");
    }
  };

  const handlePhoneChange = (e, setFieldValue) => {
    let phoneValue = formatPhone(e.target.value);

    if (phoneValue[phoneValue.length - 1] === "-") {
      phoneValue = phoneValue.slice(0, -1);
    }

    setPhone(phoneValue);
    setFieldValue("number", phoneValue);
  };

  return (
    <Formik
      initialValues={{ name: "", number: phone }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onAddContact(values.name, values.number);
        resetForm();
        setPhone("");
      }}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <label htmlFor="name">Name</label>
          <Field
            type="text"
            name="name"
            className={styles.input}
            id="name"
            autoComplete="name"
          />
          <ErrorMessage name="name" component="div" className={styles.error} />

          <label htmlFor="number">Number</label>
          <Field
            type="text"
            name="number"
            className={styles.input}
            id="number"
            value={phone}
            onChange={(e) => handlePhoneChange(e, setFieldValue)}
            autoComplete="tel"
          />
          <ErrorMessage
            name="number"
            component="div"
            className={styles.error}
          />

          <button type="submit" className={styles.button}>
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
