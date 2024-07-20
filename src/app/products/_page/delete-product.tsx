"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { gql, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from "../page"
// Define mutation
const DELETE_PRODUCT = gql`
    mutation DeleteProduct($input: DeleteProductInput!) {
        deleteProduct(input: $input) {
            id
        }
    }
`;




export default function DeleteProduct({ product }: { product: any }) {
    const [deleteProduct, { data, loading, error }] = useMutation(DELETE_PRODUCT, {
        refetchQueries: [
            GET_PRODUCTS, // DocumentNode object parsed with gql
            'GetProducts' // Query name
        ],
    });



    // 2. Define a submit handler.
    const onSubmit = async () => {

        const input = { id: product.id, user: product.user };

        try {
            await deleteProduct({
                variables: {
                    input,
                },
            });
            console.log("Product deleted successfully", data);
        } catch (err) {
            console.error("Error delete product", err);
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button>Delete</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure to delete the product ?
                        </DialogDescription>
                    </DialogHeader>
                    {loading && <p>deleting ...</p>}
                    {error && <p>Error : {error.message}</p>}
                    <DialogClose asChild>
                        <Button variant="secondary" onClick={onSubmit}>Delete</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>

        </>
    )
}