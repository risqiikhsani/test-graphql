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
const CREATE_PRODUCT = gql`
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
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
    user: z.string().min(2).max(50),
    description: z.string(),
    quantity: z.number().min(1).max(1000),
})

export default function CreateProduct() {
    const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT, {
        refetchQueries: [
            GET_PRODUCTS, // DocumentNode object parsed with gql
            'GetProducts' // Query name
        ],
    });

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            user: "",
            description: "",
            quantity: 1
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const input = { ...values};

        try {
            await createProduct({
                variables: {
                    input,
                },
            });
            console.log("Product created successfully", data);
        } catch (err) {
            console.error("Error creating product", err);
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button>Create Product</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Product</DialogTitle>
                        <DialogDescription>
                            Create new product
                        </DialogDescription>
                    </DialogHeader>
                    {loading && <p>creating ...</p>}
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
                                name="user"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>user</FormLabel>
                                        <FormControl>
                                            <Input placeholder="user" {...field} />
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