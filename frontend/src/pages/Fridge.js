import { useLocation } from 'react-router-dom';
import FridgeImage from '../assets/Fridge-open.jpg'

export default function Fridge() {
  const location = useLocation();
  const userId = location.state && location.state.user_id;
  console.log('Printed on fridge page:', userId);

  return (
    <div>
      <p>TEST FRIDGE</p>
      <img src={FridgeImage} alt="Fridge" />
      <p>Welcome to your fridge {userId}!</p>
    </div>
  )
}