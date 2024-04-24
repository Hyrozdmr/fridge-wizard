// file: frontend/src/components/welcome.js
import React from 'react';
import SimpleTextField from './forms/simpleTextField';


// Welcome page elements to be conditionally rendered on landing page
export default function Welcome() {

  // Declare a useForm variable to handle submitting information
  const {handleSubmit, control} = useForm({defaultValues:defaultValues})

  return (
    <div>

      Welcome
      <div className='login-field'>

          <SimpleTextField
          label='Email'
          name='email'
          control={control}
          placeholder='Input your email'
          width={'30%'}>
          </SimpleTextField>

      </div>
      
    </div>
  )

}