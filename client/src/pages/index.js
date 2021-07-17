import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import HomePage from "./home";

const Index = () => {
  const { data, error, isLoading } = useQuery("hello", () => {
    return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/spotify/hello`); // TODO: Remove this.
  });
  const router = useRouter();

  if (error) {
    console.log("error");
    return <Text>error</Text>;
  }

  if (isLoading) {
    return <Text>loading...</Text>;
  }

  if (!data) {
    return <Text>no data...</Text>;
  }

  console.log(data);
  console.log(router);

  return <HomePage />;
};

export default Index;
