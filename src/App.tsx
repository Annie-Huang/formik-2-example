import { Formik, Field, Form } from 'formik';
import { TextField, Button, Checkbox, Radio } from '@material-ui/core';

function App() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          isTall: false,
          cookies: [],
          yogurt: '',
        }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          // make async call
          console.log('submit: ', data);

          setSubmitting(false);
          resetForm();
        }}
      >
        {/*{({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (*/}
        {({ values, isSubmitting }) => (
          // <form onSubmit={handleSubmit}>
          <Form>
            {/*<TextField*/}
            {/*  name="firstName"*/}
            {/*  value={values.firstName}*/}
            {/*  onChange={handleChange}*/}
            {/*  onBlur={handleBlur}*/}
            {/*/>*/}

            {/* Use Field from formik instead of TextField from material-ui. the 'as' property will force it to use the style */}
            <div>
              <Field
                placeholder='first name'
                name='firstName'
                type='input'
                as={TextField}
              />
            </div>
            <div>
              <Field
                placeholder='last name'
                name='lastName'
                type='input'
                as={TextField}
              />
            </div>

            <Field name='isTall' type='checkbox' as={Checkbox} />

            <div>cookies</div>
            <Field
              name='cookies'
              type='checkbox'
              value='chocolate chip'
              as={Checkbox}
            />
            <Field
              name='cookies'
              type='checkbox'
              value='snickerdoodle'
              as={Checkbox}
            />
            <Field name='cookies' type='checkbox' value='sugar' as={Checkbox} />

            <div>yogurt</div>
            <Field name='yogurt' type='radio' value='peach' as={Radio} />
            <Field name='yogurt' type='radio' value='blueberry' as={Radio} />
            <Field name='yogurt' type='radio' value='apple' as={Radio} />

            <div>
              <Button disabled={isSubmitting} type='submit'>
                submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
