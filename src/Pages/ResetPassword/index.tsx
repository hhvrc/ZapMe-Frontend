import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function ResetPassword(): JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
      <>
        <Helmet>
          <title> ZapMe - Reset Password </title>
        </Helmet>
        Reset Password: {searchParams.get('token')}
      </>
    );
  }
  
  export default ResetPassword;