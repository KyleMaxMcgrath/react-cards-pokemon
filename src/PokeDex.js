import React from "react";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import {useAxios} from "./hooks"

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
/*   const [pokemon, setPokemon] = useState([]);
  const addPokemon = async name => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}/`
    );
    setPokemon(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
  }; */

  const formatter = (data) => {
    return {
      id: data['id'],
      sprites: data['sprites'],
      name: data['name'],
      stats: data['stats']
    }
  };
  const [pokemon, addPokemon, removeAll] = useAxios(`https://pokeapi.co/api/v2/pokemon`, formatter, 'pokemon');


  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} />
        <button onClick={removeAll}>Remove all pokemon</button>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.sprites.front_default}
            back={cardData.sprites.back_default}
            name={cardData.name}
            stats={cardData.stats.map(stat => ({
              value: stat.base_stat,
              name: stat.stat.name
            }))}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
