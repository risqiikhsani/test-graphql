"use client"


import { ApolloProvider } from "@apollo/client";
import { Children } from "react";
import client from "./apolloClient";

export default function CustomApolloProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <>
        <ApolloProvider client={client}>
        {children}
        </ApolloProvider>
        
        </>
    )
}