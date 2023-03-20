import Button from "./components/Button";
import Input from "./components/Input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signUp } from "./api";

function Registration() {
  const navigate = useNavigate();
  const [fName, setFName] = useState("");
  const [sName, setSName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const click = () => {
    signUp(fName, sName, email, password)
      .then((data) => data.json())
      .then((res) => {
        if (res.email == 1) {
          setError(true);
        } else {
          navigate("/");
        }
      });
  };
  useEffect(() => {
    setError(false);
  }, [email]);

  return (
    <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-emerald-600">
          Registration
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Input title="First Name" type="text" onChange={setFName} />
          <Input title="Last Name" type="text" onChange={setSName} />
          <Input title="Email address" type="email" onChange={setEmail} />
          <Input title="Password" type="password" onChange={setPassword} />

          <div className="flex items-center justify-between text-sm ">
            <button
              onClick={() => navigate("/")}
              className="font-medium border-none bg-transparent text-emerald-600 hover:text-emerald-500"
            >
              SignIn
            </button>
          </div>

          <Button
            type="button"
            title=" Create an account"
            onClick={click}
          ></Button>
          {error && (
            <div className="text-red-600">
              user with this email address is already registered
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Registration;
