
import CodeSnippet from "../components/code-snippet";
import DrumHeader from "../components/drum-header";
import DrumMachine from "../components/drum-machines";
import MainWrapper from "../components/main-wrapper";
import SoundEnabledProvider from "../components/sound-enabled-provider/sound-enabled-provider";
import HitCounter from "./hit-counter";


function Home() {
  return (
    <MainWrapper>
      <SoundEnabledProvider>
        <DrumHeader />
        <DrumMachine />
      </SoundEnabledProvider>
      <footer>
        <img
          src="/ie-badge.gif"
          width={100}
        />
        <span>Thanks for visiting!</span>
      </footer>
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