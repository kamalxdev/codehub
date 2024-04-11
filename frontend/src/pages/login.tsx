import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
        let data =  res.data;
        console.log(data);
        if(data.status===400){
          alert(data.message)
        }
        if(data.status===200){
          alert(data.message);
          document.cookie = `x-auth-token=${data.token}`;
          navigate("/")
        }
        
      })
      .catch((err) => {
        console.log("Error on login form submission",err);
        alert("Error on login form submission")
      });
  }

  return (
    <Box
      sx={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2 }} color={"black"}>
        Login Form
      </Typography>
      <TextField
        fullWidth
        label="Username"
        error={Boolean(errors?.username)}
        helperText={errors?.username?.message}
        margin="normal"
        onChange={(e) => {
          setData({ ...data, username: e.target.value });
        }}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        margin="normal"
        sx={{ mt: 2 }}
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Link href="#" variant="body2">
          Forgot Password?
        </Link>
        <Box mt={1}>
          <Link href="#" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Login);
