
import CodeSnippet from "../components/code-snippet";
import MainWrapper from "../components/main-wrapper";
import HitCounter from "./hit-counter";


function Home() {
  return (
    <MainWrapper>
      <CodeSnippet />
      <h1>
        Exploring the trade-offs with half-gauge vs.
        full-gauge wire in laminated woodworking
      </h1>
      <h2>By Saanvi Agarwal and Vera Chauhan</h2>
      <hr />
      {/* ✂️ lots of <p> and <figure> tags here */}
      <p>Page hit count <HitCounter /> </p>
    </MainWrapper>
  );
}

export default Home;