import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data?.message || error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "An unknown error occurred";
  }

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center min-h-screen bg-Sly-bg dark:bg-Sly-D-bg text-center p-4"
    >
      <h1 className="text-4xl font-bold text-red-600 dark:text-red-500 mb-4">
        Oops!
      </h1>
      <p className="text-lg text-Sly-grey-700 dark:text-Sly-grey-300 mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      {errorStatus && (
        <p className="text-xl font-semibold text-red-500 dark:text-red-400 mb-4">
          Error {errorStatus}
        </p>
      )}
      <p className="text-md text-Sly-grey-500 bg-red-100 dark:bg-red-900/20 dark:text-red-300 p-4 rounded-lg">
        <i>{errorMessage}</i>
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-Sly-grey-900 text-white rounded-lg shadow hover:bg-Sly-grey-700 dark:bg-Sly-blue dark:hover:opacity-90 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
