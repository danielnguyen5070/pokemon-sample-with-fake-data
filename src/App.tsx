import PokemonList from './features/pokemon';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <h1 className="text-3xl font-bold text-center py-6 text-blue-700">Pokédex</h1>
      <PokemonList />
    </div>
  );
}

export default App;

