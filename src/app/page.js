import HitCounter from "./hit-counter";



function Home() {

  return (
    <main>
      <h1>Welcome!</h1>
      <h2>Hello Next!</h2>
      <p>You are visitor number <HitCounter />.</p>
      <footer>
        Page rendered on{' '}{
          new Date().toLocaleString()
        }
      </footer>
    </main>
  );
}

export default Home;
