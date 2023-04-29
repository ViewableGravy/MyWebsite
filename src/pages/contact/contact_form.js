import React from "react";
import { createUseStyles } from "react-jss";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

const styles = {
  outer: {
    maxWidth: '700px',
    minHeight: '800px',
    padding: '40px',
    paddingLeft: '100px',
    flexGrow: 2,
    '@media screen and (max-width: 1280px)': {
      paddingLeft: '40px',
      maxWidth: '100%',
      width: 'clamp(390px, 700px, 100%)',
    },
  },
  form: {
    background: '#eeeeee',
    borderRadius: '20px',
    padding: '40px',
    color: 'var(--primary)',
    maxWidth: '700px',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media screen and (max-width: 1280px)': {
      height: 'fit-content',
      padding: '25px'
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  interests: {
    border: 'none',
    padding: '30px 0 14px 0',
    margin: '0 0 20px 0',
    borderRadius: '10px',
    position: 'relative',

    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    flexWrap: 'wrap',

    '@media (width < 1280px)': {
      gap: '5px',
    }
  },
  legend: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  container: {
    position: 'relative',
    padding: '16px 28px 16px 28px',
    margin: 0,
    width: 'fit-content',
    fontSize: '22px',
    fontWeight: 'bold',
    borderRadius: '10px',
    border: '3px solid var(--font-deselected)',
    cursor: 'pointer',
    '-webkit-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
    color: 'var(--font-deselected)',
    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border 0.2s ease-in-out',
  
    '&:hover': {
      backgroundColor: 'var(--secondary-50)',
      border: '3px solid var(--secondary-50)',
      color: 'white',
    },
    '&:has(> input:checked)': {
      backgroundColor: 'var(--secondary)',
      border: '3px solid var(--secondary)',
      color: 'white',
    },
    '& > input[type=checkbox]': {
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
      height: 0,
      width: 0,
    },
    '&:has(> input:focus)': {
      backgroundColor: 'var(--secondary-50)',
      border: '3px solid var(--primary)',
      color: 'white',
    },
    '&:has(> input:focus):has(> input:checked)': {
      border: '3px solid var(--primary)',
    },
    '@media (width < 1280px)': {
      padding: '7px 14px 7px 14px',
      fontSize: '16px',
    }
  },
  technicalLabel: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '10px',
  },
  slider: {
    '-webkit-appearance': 'none',  /* Override default CSS styles */
    appearance: 'none',
    width: '100%',
    height: '10px',
    borderRadius: '5px',
    background: 'var(--secondary-50)',
    marginBottom: '40px',
    marginTop: '15px',
    '&:focus': {
      outline: 'none',
      border: '2px solid var(--primary)',         
    },
    '&::-webkit-slider-thumb': {
      '-webkit-appearance': 'none',
      appearance: 'none',
      background: 'var(--secondary)',
      height: '20px',
      width: '20px',
      borderRadius: '50%',
    },
  },
  text: {
    all: 'unset',
    display: 'block',
    marginBottom: '40px',
    borderBottom: '3px solid var(--font-deselected)',
    width: '100%',
    paddingBottom: '6px',
    fontWeight: 'bold',
    borderRadius: '1px',
    '&:focus': {
      borderBottom: '3px solid var(--secondary)',
      color: 'var(--primary)',
      caretColor: 'var(--secondary)'
    },
    '&:focus::placeholder': {
      color: 'var(--secondary)'
    }
  },
  name: {
    
  },
  message: {
    height: '30px',
    overflowY: 'hidden'
  },
  submit: {
    padding: '20px 45px 20px 45px',
    borderRadius: '10px',
    fontWeight: '500',
    backgroundColor: 'var(--secondary)',
    border: '1px solid transparent',
    color: 'white',
    fontSize: '1.1rem',
    cursor: 'pointer',
    '& > i': {
      marginRight: '10px',
    },
    '&:focus': {
      outline: '2px solid var(--primary)'
    }
  }
}

const useStyle = createUseStyles(styles);

const server = process.env.REACT_APP_BACKEND_SERVER;
const port = process.env.REACT_APP_BACKEND_PORT;
const protocol = process.env.REACT_APP_BACKEND_PROTOCOL;
const url = `${protocol}://${server}:${port}/api/contact`;

export const ContactForm = () => {
  const classes = useStyle();
  const captchaRef = React.useRef();
  const [sliderValue, setSliderValue] = useState(50);
  const handleSubmitWithCaptcha = async (values, { setSubmitting }) => {
    return handleSubmit(values, captchaRef, setSubmitting);
  }

  return (
    <div className={classes.outer}>
      <Formik
        initialValues={{ 
          name: '', 
          email: '', 
          message: '',
          interests: [], 
        }}
        validate={validateForm}
        onSubmit={(values, { setSubmitting }) => handleSubmit({ ...values, sliderValue }, captchaRef, setSubmitting)}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form className={classes.form}>
            <div>
              <fieldset className={classes.interests}>
                <legend className={classes.legend}>I'm interested In...</legend>

                <label className={classes.container}>Frontend
                  <Field type="checkbox" name="interests" value="Frontend" />
                </label>
                <label className={classes.container}>Backend
                  <Field type="checkbox" name="interests" value="Backend" />
                </label>
                <label className={classes.container}>Gaming
                  <Field type="checkbox" name="interests" value="Gaming" />
                </label>
                <label className={classes.container}>Other
                  <Field type="checkbox" name="interests" value="Other" />
                </label>
              </fieldset>

              <label htmlFor="technical" className={classes.technicalLabel}>My technical level is...</label>
              <Field className={classes.slider} type="range" min={1} max={100} value={sliderValue} onChange={e => setSliderValue(e.target.value)} id="technical" />

              <ErrorMessage name="name" component="div"/>
              <Field className={`${classes.text} ${classes.name}`} type="text" name="name" placeholder="Your name"/>

              <ErrorMessage name="email" component="div"/>
              <Field className={classes.text} type="text" name="email" placeholder="Your email"/>
              
              <ErrorMessage name="message" component="div"/>
              <textarea 
                className={`${classes.text} ${classes.message}`} 
                placeholder="Your Message" 
                name="message"
                value={values.message}
                onChange={handleChange}
              ></textarea>

              <ReCAPTCHA ref={captchaRef} sitekey={process.env.REACT_APP_SITE_KEY} size={'invisible'} />
            </div>

            <button type="submit" className={classes.submit} disabled={isSubmitting} >
              <i className="fa-solid fa-paper-plane"></i>
              <span>Send Message</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

function validateForm(values) {
  const errors = {};
  
  if (!values.name) errors.name = 'Required';
  if (!values.message) errors.message = 'Required';
  if (!values.email) errors.email = 'Required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { //email regex
    errors.email = 'Invalid email address';
  }

  return errors;
}



async function handleSubmit(values, captchaRef, setSubmitting) {
  try {
    const token = await captchaRef.current.executeAsync();
    captchaRef.current.reset();

    const result = await axios.post(url, {
      name: values.name,
      email: values.email,
      message: values.message,
      interests: values.interests,
      technical: values.sliderValue,
      captchaToken: token,
    });

    console.log(result);

  } catch (error) {
    console.log('An error has occured, information below:\n' + error)
  } finally {
    setSubmitting(false);
  }
}