import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import UpdateProduct from "./update-product";
import DeleteProduct from "./delete-product";


export default function Product({ data }: { data: any }) {
    return (
        <>
            <div key={data.id} className="border border-md border-yellow-400 rounded-lg p-2">
                <div>
                    <CardTitle>{data.name}</CardTitle>
                    <CardDescription>{data.user}</CardDescription>
                    <p>created : {data.time_creation}</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1"></div>
                    <UpdateProduct product={data}/>
                    <DeleteProduct product={data}/>
                    <Button variant="link">
                        <Link href={`products/${data.id}/${data.user}`}>Visit</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}