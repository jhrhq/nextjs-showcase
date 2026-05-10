import { random } from "@/utils";

function LibraryGameCardSkeleton() {
  return (
    <article className="library-game-card skeleton" aria-hidden="true">
      <div className="hero-img"></div>
      <h2>Lorem Ipsum</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s
      </p>
      <dl>
        <dt>Time played</dt>
        <dd>{random(0, 500)} hours</dd>
        <dt>Achievements</dt>
        <dd>
          {random(0, 10)} <span className="normal-font">/</span> {random(4, 20)}
        </dd>
      </dl>
    </article>
  );
}

export default LibraryGameCardSkeleton;
