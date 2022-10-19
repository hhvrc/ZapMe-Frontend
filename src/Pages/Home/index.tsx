import { Helmet } from "react-helmet-async";

function HomePage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title> ZapMe - Home </title>
      </Helmet>
      Home
    </>
  );
}

export default HomePage;