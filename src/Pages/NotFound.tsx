import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <main className="flex alignCenter justifyCenter">
        <section className="notFound flex width95 maxWidth alignCenter justifyCenter flexColumn">
          <h1>
            404 <span>error</span>
          </h1>
          <h2>Page not found</h2>
          <h3>😔</h3>
          <Link to="http://localhost:3000">
            Return to home{" "}
            <PiArrowCounterClockwiseBold style={{ marginBottom: "-0.18rem" }} />
          </Link>
        </section>
      </main>
    </>
  );
}
