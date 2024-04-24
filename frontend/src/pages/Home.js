// file: frontend/src/pages/Home.js
import Welcome from '../components/welcome';

// Home page conditionally renders welcome, login or signup elements
export default function Home() {

  return (
    <div>
      <Welcome />
    </div>
  )
}