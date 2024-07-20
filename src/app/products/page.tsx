"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useQuery, gql } from '@apollo/client';
import CreateProduct from "./_page/create-product";
import Product from "./_page/product";

export const GET_PRODUCTS = gql`
    query GetProducts {
        listProducts(limit: 10) {
            items {
                id
                user
                name
                time_creation
                quantity
                description
            }
        }
    }
`;

export default function Page() {
    const { loading: products_loading, error: products_error, data: products_data } = useQuery(GET_PRODUCTS);
    if (products_loading) return <p>Loading...</p>;
    if (products_error) return <p>Error : {products_error.message}</p>;

    return (
        <>
            <div className="flex flex-col gap-2 p-4">
                <CreateProduct />
                {products_data.listProducts.items.map((p: any) => (
                    <Product data={p}/>
                ))}
            </div>

        </>
    )
}