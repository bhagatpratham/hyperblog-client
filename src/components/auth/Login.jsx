 /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { account } from "../../config";
// import SocialSignIn from "./SocialSignIn";

// const Login = () => {
//   const [loginDetails, setLoginDetails] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const loginUser = async (e) => {
//     e.preventDefault();
//     try {
//       await account.createEmailSession(
//         loginDetails.email,
//         loginDetails.password
//       );
//       navigate("/home");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h3>Login</h3>
//       <form>
//         <div>
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             onChange={(e) =>
//               setLoginDetails({
//                 ...loginDetails,
//                 email: e.target.value,
//               })
//             }
//             type="email"
//             className="form-control"
//             id="email"
//             name="email"
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             onChange={(e) =>
//               setLoginDetails({
//                 ...loginDetails,
//                 password: e.target.value,
//               })
//             }
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//           />
//         </div>
//         <div className="mb-3">
//           <span>New here?</span>{" "}
//           <Link to="/signup">
//             <button>Signup</button>
//           </Link>
//         </div>

//         <button onClick={(e) => loginUser(e)} type="submit">
//           Login
//         </button>
//       </form>
//       <SocialSignIn />
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { account } from "../../config";
import SocialSignIn from "./SocialSignIn";
import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Home from "../Home";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailSession(
        loginDetails.email,
        loginDetails.password
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt="20px" p="20px" bg="brand" borderRadius="md">
      <Text fontSize="24px" fontWeight="bold" textAlign="center" mb="20px">
        Login
      </Text>
      <form>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails({
                ...loginDetails,
                email: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            id="password"
            name="password"
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails({
                ...loginDetails,
                password: e.target.value,
              })
            }
          />
        </FormControl>
        <Box mt="10px" textAlign="center">
          <Text display="inline-block">New here? </Text>
          <Link  to="/signup">
            <Button variant="link">Signup</Button>
          </Link>
        </Box>

        <Button
          mt="20px"
          w="full"
          colorScheme="brand"
          onClick={(e) => loginUser(e)}
        >
          Login
        </Button>
      </form>
      <SocialSignIn />
      <Home />
    </Box>
  );
};

export default Login;
