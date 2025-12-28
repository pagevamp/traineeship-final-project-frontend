import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { rideTableableHeaders } from "@/core/types/history-types"
import { dummyRides } from "@public/docs/dummyRides"
import Image from "next/image"
export const RideTable = () => {
  return (
    <Table className="bg-radial-[at_90%_85%] from-bg-card-bg-100 to-primary-100 to-100% border-3 border-black">
        <TableHeader>
            <TableRow className="border-b border-t border-primary-100">
                {rideTableableHeaders.map((headers) => (
                  <TableHead key={headers} className='text-center text-white font-primary text-md py-3 border-r'>
                    {headers}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
  
            <TableBody>
              {dummyRides.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    {data.id}
                  </TableCell>
                  <TableCell><Image src={data.passenger.profileImage} alt='passenger' width={16} height={16}/>{" "}{data.passenger.firstName}{" "}{data.passenger.lastName}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {data.pickupLocation}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {data.destination}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span><>From : </>{data.departureTime.departureStart} To : {data.departureTime.departureEnd}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {data.acceptedAt}
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
</Table>
  )
}



