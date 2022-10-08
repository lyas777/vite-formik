import { useRef } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PreviewImage from './PreviewImage';
import KErrorMessage from './KErrorMessage';
const SUPPORT_FORMATS = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpg',
  'image/jpeg',
  'image/png',
];
const matchName = (value) => {
  let valor = value.substr(0, 4).toLowerCase();
  return valor === 'csla';
};
const FormTest = () => {
  const fileRef = useRef(null);
  const validationSchema = yup.object({
    file: yup
      .mixed()
      .nullable()
      .test(
        'FILE_FORMAT',
        'Uploaded file has unsupported format.',
        (value) => !value || (value && SUPPORT_FORMATS.includes(value?.type))
      )
      .test(
        'FILE_NAME',
        'Nombre del archivo no empieza con CSLA',
        (value) => !value || (value && matchName(value?.name))
      ),
  });
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ file: null }}
        onSubmit={(values) => {
          console.log(values);
          matchName(values.file.name);
        }}>
        {({ values, setFieldValue, errors }) => (
          <Form>
            <input
              ref={fileRef}
              hidden
              type='file'
              name='file'
              onChange={(event) => {
                setFieldValue('file', event.target.files[0]);
              }}
            />
            {values.file && <PreviewImage file={values.file} />}
            <KErrorMessage name='file' />
            <button
              onClick={() => {
                fileRef.current.click();
              }}>
              Upload
            </button>
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormTest;
