"use client"

import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
    query GetProducts {
    listProducts(limit: 10) {
        items {
        id
        name
        quantity
        user
        }
    }
    }
`;

export default function Page(){
    const { loading, error, data } = useQuery(GET_PRODUCTS);


    if (loading) return <p>Loading...</p>;
  
    if (error) return <p>Error : {error.message}</p>;

    return(
        <>
        {data.listProducts.items.map((p:any) => (
            <div key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.quantity}</p>
            <p>{p.user}</p>
            </div>
        ))}
        </>
    )
}