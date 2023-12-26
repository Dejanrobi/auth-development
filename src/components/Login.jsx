import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

import { Link } from 'react-router-dom'

export default function Login() {

  // creating the refs
  const emailRef = useRef()
  const passwordRef = useRef()

  // Creating an error state
  const [error, setError] = useState('')

  // loading state
  const [loading, setLoading] = useState(false);

  // getting the signup function
  // checking if then current user works by obtaining the current user
  const { login } = useAuth()

  

  // a function to handle form's submission and sign up the user.
  async function handleSubmit(e){
    e.preventDefault()

    

    try {
      // setting the error to an empty string before we set anything
      setError('')
      // setting loading state when the user is being created
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)    
    } catch (error) {
      // setting the error
      setError('Failed to sign in');
      console.log(error)
    }
    // after everything is done we then:
    setLoading(false)

    
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
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
            

            <Button disabled={loading} className='w-100 mt-4' type='submit'>Log In</Button>
          </Form>
          <div className='w-100 text-center mt-2'>
              <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>       
      </Card>
      <div className='w-100 text-center mt-2'>
          Need an Account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
