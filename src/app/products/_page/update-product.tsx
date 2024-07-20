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
const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($input: UpdateProductInput!) {
        updateProduct(input: $input) {
            id
            name
            quantity
            user
            description
            time_creation
        }
    }
`;


const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string(),
    quantity: z.number().min(1).max(1000),
})

export default function UpdateProduct({product}:{product:any}) {
    const [updateProduct, { data, loading, error }] = useMutation(UPDATE_PRODUCT, {
        refetchQueries: [
            GET_PRODUCTS, // DocumentNode object parsed with gql
            'GetProducts' // Query name
        ],
    });

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            quantity: product.quantity
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const input = { ...values, id:product.id, user:product.user};

        try {
            await updateProduct({
                variables: {
                    input,
                },
            });
            form.reset();
            console.log("Product updated successfully", data);
        } catch (err) {
            console.error("Error updating product", err);
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button>Update</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Product</DialogTitle>
                        <DialogDescription>
                            Update product
                        </DialogDescription>
                    </DialogHeader>
                    {loading && <p>updating ...</p>}
                    {error && <p>Error : {error.message}</p>}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="name product" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Product description"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>quantity</FormLabel>
                                        <FormControl>
                                            <Input placeholder="quantity" {...field} type="number"
                                                onChange={event => field.onChange(+event.target.value)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogClose asChild>
                                <Button type="submit" variant="secondary">Submit</Button>
                            </DialogClose>

                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </>
    )
}