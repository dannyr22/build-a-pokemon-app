import { useState, useEffect } from 'react'
import PokemonList from './PokemonList';
import Pagination from './Pagination'
import axios from 'axios'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
  const [nextPageUrl, setNextPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
  const [previousPageUrl, setPreviousPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
  const [loading, setLoading] = useState(true)


  useEffect(() => {
  setLoading(true)
  let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
  .then(res => {
    setLoading(false)
    setNextPageUrl(res.data.next)
    setPreviousPageUrl(res.data.previous)
    setPokemon(res.data.results.map(p => p.name))
  })
  return () => cancel()
  }, [currentPageUrl])

  function goToNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }
  function goToPreviousPage(){
    setCurrentPageUrl(previousPageUrl)
  }


  
 
if (loading) return "Loading..."

  return (
    <>
      <PokemonList pokemon={pokemon}/>
      <Pagination 
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPreviousPage={previousPageUrl ? goToPreviousPage : null}
      />
    </>  
  );
}

export default App;
