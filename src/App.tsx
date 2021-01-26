import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldHookConfig,
} from 'formik';
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
} from '@material-ui/core';

// type MyRadioProps = { label: string } & FieldAttributes<{}>;       // FieldAttributes are from the tutorial.
type MyRadioProps = { label: string } & FieldHookConfig<{}>; // FieldHookConfig is from the version of Formik I used...

// useField is to get access to the Formik properties. You will have to use this whenever you have a field that does not map
// to your UI component simply. You will need to create a custom component like so. and then to get access to any of the formik
// properties we use the useField
const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  // Click into useField through ctrl, you will see:
  // export declare function useField<Val = any>(propsOrFieldName: string | FieldHookConfig<Val>): [FieldInputProps<Val>, FieldMetaProps<Val>, FieldHelperProps<Val>];
  // const [field, meta] = useField(props);
  const [field, meta] = useField<{}>(props);

  // field got checked, mutiple, name, onBlur, onChange, value, etc properties.
  // field.
  // meta got error, initialError, initialTouched, initialValue, touched, value, etc properties
  // meta.

  //<FormControlLabel value='other' control={<Radio />} label='Other' />;
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField: React.FC<FieldHookConfig<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

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
        validate={(values) => {
          const errors: Record<string, string> = {};

          if (values.firstName.includes('bob')) {
            errors.firstName = 'no bob';
          }

          return errors;
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
        {({ values, errors, isSubmitting }) => (
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
              {/*<Field*/}
              {/*  placeholder='first name'*/}
              {/*  name='firstName'*/}
              {/*  type='input'*/}
              {/*  as={TextField}*/}
              {/*/>*/}

              <MyTextField
                placeholder='first name'
                name='firstName'
                type='input'
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
            {/*<Field name='yogurt' type='radio' value='peach' as={Radio} />*/}
            {/*<Field name='yogurt' type='radio' value='blueberry' as={Radio} />*/}
            {/*<Field name='yogurt' type='radio' value='apple' as={Radio} />*/}
            <MyRadio name='yogurt' type='radio' value='peach' label='peach' />
            <MyRadio
              name='yogurt'
              type='radio'
              value='blueberry'
              label='blueberry'
            />
            <MyRadio name='yogurt' type='radio' value='apple' label='apple' />

            <div>
              <Button disabled={isSubmitting} type='submit'>
                submit
              </Button>
            </div>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
