import { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import { API2 } from "../libs/api";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
  const [user, setuser] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await API2.get("/", {
        params: {
          user,
          password,
        },
      });

      const data = response.data;

      if (user === "admin" && password === "bismillah") {
        setIsLoggedIn(true);
        navigate("/");
        console.log("Authentication successful.", data);
      } else {
        alert("Incorrect email or password");
      }
    } catch (error) {
      console.error("Authentication failed:", error.message);
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="user">
            <FormLabel>User</FormLabel>
            <Input
              type="text"
              value={user}
              onChange={(e) => setuser(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox
                isChecked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              >
                Remember me
              </Checkbox>
              <Text color={"blue.500"}>Forgot password?</Text>
            </Stack>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
