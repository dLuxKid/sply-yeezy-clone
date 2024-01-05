import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="bg-[rgba(241,240,234)] w-full relative min-h-screen"
    >
      <div className="fixed left-[4.5rem] z-[100] bottom-[4.5rem] flex flex-col gap-3 items-start justify-center">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
}
