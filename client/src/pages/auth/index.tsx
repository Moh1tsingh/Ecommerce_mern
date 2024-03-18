import Axios from "axios";
import { useState, SyntheticEvent } from "react";
import { UserErrors } from "../../models/errors";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="w-screen h-[91vh] flex justify-center items-center gap-14">
      <Register />
      <Login />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:3001/user/register", {
        username,
        password,
      });
      alert("Registeration Successfull! You may login now");
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert("Username already exists");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className=" w-2/6 h-4/5 bg-white rounded-lg flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 gap-4">
        <h1 className=" text-xl font-semibold">Register a New User</h1>

        <input
          className=" bg-slate-100 h-14 rounded-lg pl-3"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          className=" bg-slate-100 h-14 rounded-lg pl-3"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className=" py-3 px-7 bg-neutral-900 text-white font-bold rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const result = await Axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      if (error?.response?.data?.type === UserErrors.NO_USER_FOUND) {
        alert("No User found, please register");
      } else if (error?.response?.data?.type === UserErrors.WRONG_CREDENTIALS) {
        alert("Username or Password is wrong!");
      } else {
        alert("Something went wrong!");
      }
    }
  };
  return (
    <div className=" w-2/6 h-4/5 bg-white rounded-lg flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-3/4 gap-4">
        <h1 className=" text-xl font-semibold">Login here</h1>

        <input
          className=" bg-slate-100 h-14 rounded-lg pl-3"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          className=" bg-slate-100 h-14 rounded-lg pl-3"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className=" py-3 px-7 bg-neutral-900 text-white font-bold rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
