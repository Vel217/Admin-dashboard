import Input from "./components/Input";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import { useState } from "react";
import { signIn, updateActivity } from "./api";
import { useEffect } from "react";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [invPassword, setInvPassword] = useState(false);

  let click = () => {
    signIn(email, password)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0 && data[0].is_blocked === 0) {
          navigate(`/Users-list/${data[0].user_id}`);

          updateActivity(data[0].user_id).then((data) => console.log(data));
        }
        if (data.email == "invalid") {
          setIsExist(true);
        }
        if (data.password == "invalid") {
          setInvPassword(true);
        }

        if (data[0]?.is_blocked == 1) {
          setIsBlocked(true);
        }
      });
  };
  useEffect(() => {
    setIsExist(false);
    setIsBlocked(false);
    setInvPassword(false);
  }, [email, password]);

  return (
    <div className="flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-emerald-600">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
          <Input title="Email address" type="email" onChange={setEmail} />
          <Input title="Password" type="password" onChange={setPassword} />

          <div className="flex items-center justify-between text-sm">
            <button
              onClick={() => navigate("/reg")}
              className="font-medium border-none bg-transparent text-emerald-600 hover:text-emerald-500"
            >
              Not registered yet?
            </button>
          </div>

          <Button title="SignIn" onClick={click} />
        </div>
        {invPassword && (
          <p className="text-red-800"> incorrect email or password </p>
        )}
        {isBlocked && (
          <p className="text-red-800">
            you are blocked. you can`t log in with this email. create new
            account
          </p>
        )}
        {isExist && (
          <p className="text-red-800">you don`t have account. create account</p>
        )}
      </div>
    </div>
  );
}

export default SignIn;
