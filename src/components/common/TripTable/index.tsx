import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { tripTableableHeaders } from "@/core/types/history-types"
import { dummyTrips } from "@public/docs/dummyTrips"
import Image from "next/image"
export const TripTable = () => {
  return (
    <div>
    <Table className="bg-radial-[at_90%_85%] from-bg-card-bg-100 to-primary-100 to-100% border-3 border-black">
          <TableHeader>
            <TableRow className="border-b border-t border-primary-100">
              {tripTableableHeaders.map((headers) => (
                  <TableHead key={headers} className='text-center text-white font-primary text-md py-3 border-r'>
                  {headers}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {dummyTrips.map((data) => (
              <TableRow key={data.id}>
                <TableCell><Image src={data.driver.profileImage} alt='passenger' width={16} height={16}/>{" "}{data.driver.firstName}{" "}{data.driver.lastName}</TableCell>

                <TableCell><Image src={data.passenger.imageUrl!} alt='passenger' width={16} height={16}/>{" "}{data.passenger.firstName}{" "}{data.passenger.lastName}</TableCell>
                <TableCell>
                  {data.ride.id}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {data.ride.pickupLocation}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {data.ride.destination}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                    <span><>From : </>{data.ride.departureTime.departureStart} To : {data.ride.departureTime.departureEnd}</span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {data.createdAt}
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
  )
}
