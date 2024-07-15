import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Product({data}:{data:any}) {
    return (
        <>
            <Card key={data.id}>
                <CardHeader>
                    <CardTitle>{data.name}</CardTitle>
                    <CardDescription>{data.user}</CardDescription>
                    <p>{data.quantity} units</p>
                    <p>created : {data.time_creation}</p>
                </CardHeader>
                <CardContent>
                    <p>{data.description}</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <div className="flex-1"></div>
                    <Button>Update</Button>
                    <Button>Delete</Button>
                </CardFooter>
            </Card>
        </>
    )
}