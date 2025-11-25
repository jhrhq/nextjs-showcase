import { readFile, writeFile } from "../helpers/file-helpers";


const DATABASE_PATH = '/src/database.json';

function Home() {
  let { hits } = JSON.parse(readFile(DATABASE_PATH))

  hits += 1

  writeFile(DATABASE_PATH, JSON.stringify({ hits }))

  return (
    <main>
      <h1>Welcome!</h1>
      <h2>Hello Next!</h2>
      <p>You are visitor number {hits}.</p>
      <footer>
        Page rendered on{' '}{
          new Date().toLocaleString()
        }
      </footer>
    </main>
  );
}

export default Home;
