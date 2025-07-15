// import {useClock} from './hooks'
import Clock from "./pages/Clock";

export default function App() {
  let today = new Date();
  // const today = useClock()
  return <Clock today={today} />;
}
