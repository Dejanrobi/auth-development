import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

import { Link } from 'react-router-dom'

export default function ForgotPassword() {

  // creating the refs
  const emailRef = useRef()


  // Creating an error state
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // loading state
  const [loading, setLoading] = useState(false);

  // getting the signup function
  // checking if then current user works by obtaining the current user
  const { resetPassword } = useAuth()

  

  // a function to handle form's submission and sign up the user.
  async function handleSubmit(e){
    e.preventDefault()

    

    try {
      setMessage('')
      // setting the error to an empty string before we set anything
      setError('')
      // setting loading state when the user is being created
      setLoading(true)
      await resetPassword(emailRef.current.value)  
      setMessage("Check your inbox for further instructions")  
    } catch (error) {
      // setting the error
      setError('Failed to reset the password');
      console.log(error)
    }
    // after everything is done we then:
    setLoading(false)

    
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Password Reset</h2>
          {/* rendering the current user */}
          {/* {JSON.stringify(currentUser)} */}
          {/* Displaying a sample email of the current user */}
          {/* {currentUser && currentUser.email} */}
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form  onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef}/>
            </Form.Group>
            

            <Button disabled={loading} className='w-100 mt-4' type='submit'>Reset Password</Button>
          </Form>
          <div className='w-100 text-center mt-2'>
              <Link to="/login">Login</Link>
          </div>
        </Card.Body>       
      </Card>
      <div className='w-100 text-center mt-2'>
          Need an Account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
