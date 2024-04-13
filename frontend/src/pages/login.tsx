import { memo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // To handle the form state
  const [errors, setErrors] = useState({
    username: { message: "" },
    password: { message: "" },
  });
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // To handle the form sunbmision
  async function handleSubmit() {
    if (!data?.username)
      return setErrors({
        ...errors,
        username: { message: "Username is required" },
      });
    if (!data?.password)
      return setErrors({
        ...errors,
        password: { message: "Password is required" },
      });
    let url = import.meta.env.VITE_SERVER_URL + "api/auth/login";
    await axios
      .post(url, data)
      .then((res) => {
        let data = res.data;
        console.log(data);
        if (data.status === 400) {
          alert(data.message);
        }
        if (data.status === 200) {
          alert(data.message);
          document.cookie = `x-auth-token=${data.token}`;
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error on login form submission", err);
        alert("Error on login form submission");
      });
  }

  return (
    <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Log in</h1>
          <p className="mt-2 text-gray-500">
            Sign in below to access your account
          </p>
        </div>
        <div className="mt-5">
          <form action="">
            <div className="relative mt-6">
              <input
                type="email"
                name="email"
                onChange={(e) => {
                  setData({ ...data, username: e.target.value });
                }}
                id="email"
                placeholder="Email Address"
                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                autoComplete="NA"
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Email Address
              </label>
            </div>
            <div className="relative mt-6">
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                placeholder="Password"
                className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
              />
              <label
                htmlFor="password"
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
              >
                Password
              </label>
            </div>
            <div className="my-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
              >
                Log in
              </button>
            </div>
            <p className="text-center text-sm text-gray-500">
              Don&#x27;t have an account yet?
              <a
                href="#!"
                className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
              >
                Sign up
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
