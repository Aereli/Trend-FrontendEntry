// import logo from './logo.svg';
import './styles/globals.scss'
import dataSmall from './data/influencerData_500.json'
import dataLarge from './data/influencerData_bigger.json'
import Cards from './components/Cards'

function App() {
  console.log(dataSmall)

  return (
    <div className="App">
      <Cards data={dataSmall} />
    </div>
  )
}

export default App
