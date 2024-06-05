import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Image from "next/image"
import { Button } from "../ui/button"
  
 
  
const OrderHistory = () => {
    return (
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[350px]">Product</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Dates</TableHead>
            <TableHead className="">Quanity</TableHead>
            <TableHead className="">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {
  [1, 2, 3, 4, 5].map((item,index) => (
    <TableRow key={index}>
      <TableCell className="font-medium">
        <div className="flex gap-x-2">
          <Image
            alt="Mens Black T-Shirt"
            className="w-16 h-16 border border-primary"
            height="100"
            src="/home/categories/bombers.png"
            style={{
              aspectRatio: "80/100",
              objectFit: "cover",
            }}
            width="80"
          />
          <div className="">
            <h3 className="text-md font-semibold">Men&apos;s Black T-Shirt</h3>
            <p className="text-sm text-gray-500">T-Shirt</p>
          </div>
        </div>
      </TableCell>
      <TableCell>#786 687</TableCell>
      <TableCell>October 17, 2024</TableCell>
      <TableCell className="">1</TableCell>
      <TableCell className="">
        <Button className="rounded-none bg-[#E0EEE2] text-[#214A25]">Manage</Button>
      </TableCell>
    </TableRow>
  ))
}

            
      
        </TableBody>
       
      </Table>
    )
  }

  export default OrderHistory;
  