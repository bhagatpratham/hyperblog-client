// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { account } from "../../config";
// import { ID } from "appwrite";

// const Signup = () => {
//   const [userDetails, setUserDetails] = useState({
//     userId: ID.unique(),
//     name: "",
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const signUpUser = async (e) => {
//     e.preventDefault();
//     try {
//       const newUser = await account.create(
//         ID.unique(),
//         userDetails.email,
//         userDetails.password,
//         userDetails.name
//       );
//       console.log(newUser);
//       navigate("/home");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h3>Signup</h3>

//       <form className="container">
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Name
//           </label>
//           <input
//             onChange={(e) => {
//               setUserDetails({
//                 ...userDetails,
//                 name: e.target.value,
//               });
//             }}
//             type="text"
//             id="name"
//             aria-describedby="name"
//             name="email"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email address
//           </label>
//           <input
//             onChange={(e) => {
//               setUserDetails({
//                 ...userDetails,
//                 email: e.target.value,
//               });
//             }}
//             type="email"
//             className="form-control"
//             id="email"
//             aria-describedby="email"
//             name="password"
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             onChange={(e) => {
//               setUserDetails({
//                 ...userDetails,
//                 password: e.target.value,
//               });
//             }}
//             type="password"
//             className="form-control"
//             id="password"
//             name="password"
//           />
//         </div>
//         <div className="mb-3">
//           <span>Already have an account ? </span>{" "}
//           <Link to="/login">
//             <button>Login</button>
//           </Link>
//         </div>

//         <button onClick={(e) => signUpUser(e)} type="submit">
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { account } from "../../config";
import { ID } from "appwrite";
import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import SocialSignIn from "./SocialSignIn";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    userId: ID.unique(),
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = await account.create(
        ID.unique(),
        userDetails.email,
        userDetails.password,
        userDetails.name
      );
      console.log(newUser);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt="20px" p="20px" bg="brand" borderRadius="md">
      <Text fontSize="24px" fontWeight="bold" textAlign="center" mb="20px">
        Signup
      </Text>
      <form>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                name: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl mt="10px">
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
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
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                password: e.target.value,
              })
            }
          />
        </FormControl>
        <Box mt="10px" textAlign="center">
          <Text display="inline-block">Already have an account? </Text>
          <Link as={Link} to="/login">
            <Button variant="link">Login</Button>
          </Link>
        </Box>
        <Button mt="20px" w="full" colorScheme="brand" onClick={(e) => signUpUser(e)}>
          Signup
        </Button>
        <SocialSignIn />
      </form>
    </Box>
  );
};

export default Signup;
