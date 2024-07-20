'use client'

import { useParams } from 'next/navigation'
import { useQuery, gql } from '@apollo/client';
import Product from '../../_page/product';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export const GET_PRODUCT_DETAIL = gql`
    query GetProduct($id: String!, $user: String!) {
        getProduct(id: $id, user: $user) {
            description
            id
            quantity
            name
            time_creation
            user
        }
    }
`;

export default function Page() {
    const params = useParams<{ id: string; user: string; }>()

    const { loading, error, data } = useQuery(GET_PRODUCT_DETAIL, {
        variables: { id: params.id, user: params.user },
        skip: !params.id || !params.user, // Skip the query if id or user is not available
    });

    if (!params.id || !params.user) return <p>Missing id or user parameter</p>;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    console.log(params);

    return (
        <div className='p-2'>
            <Card>
                <CardHeader>
                    <CardTitle>{data.getProduct.name}</CardTitle>
                    <CardDescription>{data.getProduct.id}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>user : {data.getProduct.user}</div>
                    <div>date created : {data.getProduct.time_creation}</div>
                    <div>quantity : {data.getProduct.quantity}</div>
                    <div>description : {data.getProduct.description}</div>
                </CardContent>
            </Card>
        </div>
    );
}