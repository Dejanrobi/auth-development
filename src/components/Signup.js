import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Signup() {

  // creating the refs
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  // Creating an error state
  const [error, setError] = useState('')

  // loading state
  const [loading, setLoading] = useState(false);

  // getting the signup function
  // checking if then current user works by obtaining the current user
  const { signup } = useAuth()

  

  // a function to handle form's submission and sign up the user.
  async function handleSubmit(e){
    e.preventDefault()

    // doing the validation checks
    // checking if the passwords are the same.
    // if passwords do not match, we return an error.
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match')
    }

    try {
      // setting the error to an empty string before we set anything
      setError('')
      // setting loading state when the user is being created
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)    
    } catch (error) {
      // setting the error
      setError('Failed to create an account');
      console.log(error)
    }
    // after everything is done we then:
    setLoading(false)

    
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {/* rendering the current user */}
          {/* {JSON.stringify(currentUser)} */}
          {/* Displaying a sample email of the current user */}
          {/* {currentUser && currentUser.email} */}
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form  onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' required ref={passwordRef}/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password' required ref={passwordConfirmRef}/>
            </Form.Group>

            <Button disabled={loading} className='w-100 mt-4' type='submit'>Sign Up</Button>
          </Form>
        </Card.Body>       
      </Card>
      <div className='w-100 text-center mt-2'>
          Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
