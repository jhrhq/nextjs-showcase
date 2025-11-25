
function Home() {
  return (
    <main>
      <h1>Hello Next!</h1>
      <footer>
        Page rendered on{' '}{
          new Date().toLocaleString()
        }
      </footer>
    </main>
  );
}

export default Home;
