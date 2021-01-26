import { Formik } from "formik";
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
            <TextField
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
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
