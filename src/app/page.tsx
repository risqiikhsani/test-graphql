import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Page(){
  return(
    <>
    <h2>Learn GraphQL</h2>
    <div>
      <Button variant="link">
      <Link href="products">CRUD Products</Link>
      </Button>
    </div>

    </>
  )
}