// file: frontend/src/pages/Home.js
import Welcome from '../components/welcome';
import useState from 'react'

// Home page conditionally renders welcome, login or signup elements
export default function Home() {

  // Set state for the home page to handle which elements will render
  const [ homePage, setHomePage ] = useState()

  return (
    <div>
      <Welcome />
    </div>
  )
}