
const useGenres = (selectedGenre) => {
  if(selectedGenre.length < 1) return "";
  
  const GenereID = selectedGenre.map((g)=>g.id);
  return GenereID.reduce((acc, curr)=> acc + "," + curr);
}

export default useGenres
