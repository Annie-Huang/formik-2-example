import { Formik, Field } from "formik";
import { TextField, Button } from "@material-ui/core";

function App() {
  return (
    <div>
      <Formik
        initialValues={{ firstName: "" }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          // make async call
          console.log("submit: ", data);

          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {/*<TextField*/}
            {/*  name="firstName"*/}
            {/*  value={values.firstName}*/}
            {/*  onChange={handleChange}*/}
            {/*  onBlur={handleBlur}*/}
            {/*/>*/}

            {/* Use Field from formik instead of TextField from material-ui. the 'as' property will force it to use the style */}
            <Field name="firstName" type="input" as={TextField}></Field>

            <div>
              <Button disabled={isSubmitting} type="submit">
                submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;
