import React, {useRef, useState} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function UpdateProfile() {

  // creating the refs
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  // Creating an error state
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // loading state
  const [loading, setLoading] = useState(false);

  // getting the signup function
  // checking if then current user works by obtaining the current user
  const { currentUser, updateEmailFunc, updatePasswordFunc } = useAuth()

  

  // a function to handle form's submission and sign up the user.
  function handleSubmit(e){
    e.preventDefault()

    

    // doing the validation checks
    // checking if the passwords are the same.
    // if passwords do not match, we return an error.
    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match')
    }

    setMessage('')
    setError('')
    setLoading(true)

    const promises = []

    // We  are adding the returned outputs to the promises array in order to ensure that all of these functions are
    // executed first before we throw any error

    // updating the email and passing the returned output to the promises array
    if(emailRef.current.value !== currentUser.email){
      promises.push(updateEmailFunc(emailRef.current.value))
    }

    // updating the password then passing the returned output to the promises array
    if(passwordRef.current.value){
      promises.push(updatePasswordFunc(passwordRef.current.value))
    }

    // if all the functions are successfull, we will display a success message showing successful  update of the profile 
    Promise.all(promises).then(()=>{
      setMessage('Profile has been successfully updated.')
    }).catch((error)=>{
      setError(error.message)
      console.log(error)
    }).finally(()=>{
      // this runs whether we succeed or fail
      setLoading(false)
    })
    

    
    
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {/* rendering the current user */}
          {/* {JSON.stringify(currentUser)} */}
          {/* Displaying a sample email of the current user */}
          {/* {currentUser && currentUser.email} */}
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form  onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' required ref={emailRef} defaultValue={currentUser.email}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type='password'  ref={passwordRef}
              placeholder='Leave blank to keep the same password'/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type='password'  ref={passwordConfirmRef}
              placeholder='Leave blank to keep the same password'/>
            </Form.Group>

            <Button disabled={loading} className='w-100 mt-4' type='submit'>Update</Button>
          </Form>
        </Card.Body>       
      </Card>
      <div className='w-100 text-center mt-2'>
          <Link to="/">Cancel</Link>
      </div>
    </>
  )
}
