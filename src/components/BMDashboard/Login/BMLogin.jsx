import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, FormText, Input, Label, Button, FormFeedback } from 'reactstrap';
import Joi from 'joi';

const BMLogin = (props) => {
  // console.log("🚀 ~ file: BMLogin.jsx:2 ~ BMLogin ~ props:", props)
  // state
  const [enteredEmail, setEnteredEmail] = useState("")
  const [enterPassword, setEnteredPassword] = useState("")
  const [validationError, setValidationError] = useState(null) 

  // push to dashboard if user is authenticated
  useEffect(() => {
    if(props.auth.isBMAuthenticated) props.history.push('/')
  },[])

  // Note email input type="text" to validate with Joi
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
  })


  const handleChange = ({ target }) => {
    // clears validationError only if error input is being edited
    if(validationError && target.name === validationError.label) setValidationError(null)
    if(target.name === "email") setEnteredEmail(target.value)
    else setEnteredPassword(target.value)
  }

  // submit login
  const handleSubmit = (e) => {
    e.preventDefault()
    // Note: Joi by default stops validation on first error
    const validate = schema.validate({ email: enteredEmail, password: enterPassword })
    if(validate.error) {
      return setValidationError({ 
        label: validate.error.details[0].context.label,
        msg: validate.error.details[0].message
      })
    }
  }
  
  return (
    <div className='container mt-5'>
      <h2>Log In To Building Management Dashboard</h2>
      <Form onSubmit={handleSubmit}>
        <FormText>
          Note: You must enter your Main account credentials to access the Building Management Dashboard
        </FormText>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="text"
            invalid={validationError && validationError.label === "email"}
            onChange={handleChange}
          />
          { validationError && validationError.label === "email" && (
            <FormFeedback>
              {validationError.msg}
            </FormFeedback>)
          }
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            invalid={validationError && validationError.label === "password"} 
            onChange={handleChange}
          />
          { validationError && validationError.label === "password" && (
            <FormFeedback>
              {validationError.msg}
            </FormFeedback>)
          }
        </FormGroup>
        <Button>
          Submit
        </Button>
      </Form>
    </div>)
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(BMLogin)