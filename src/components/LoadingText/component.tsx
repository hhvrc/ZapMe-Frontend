import * as React from "react";

interface IProps {
}

function LoadingText(props: IProps): JSX.Element {
  const [i, setI] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => setI(i < 3 ? i + 1 : 0), 1000);
    return () => clearInterval(interval);
  } , [i]);

  return(
      <b>{ 'Loading' + '.'.repeat(i) }</b>
  );
}

export default LoadingText;