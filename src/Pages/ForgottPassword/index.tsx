import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function ForgotPasswordPage(): JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
      <>
        <Helmet>
          <title> ZapMe - Forgot Password </title>
        </Helmet>
        Reset Password: {searchParams.get('token')}
      </>
    );
  }
  
  export default ForgotPasswordPage;