import { GameList } from "./components/index";

export default function games() {
  return (
    <div style={{height: 350, width: "100%"}}>
      <h2>Game Search</h2>
      <GameList></GameList>
    </div>
  );
}
