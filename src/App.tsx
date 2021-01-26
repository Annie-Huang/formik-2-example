import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";

function App() {
  return (
    <div>
      <Formik
        initialValues={{ firstName: "" }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);

          // make async call
          console.log("submit: ", data);

          setSubmitting(false);
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
            <Button disabled={isSubmitting} type="submit">
              submit
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;
