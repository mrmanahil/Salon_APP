import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as bookingApi from "../../api/booking.api";
import classNames from "classnames";
import Button from "../../components/Util/Button/Button";
import { BOOKING_TYPES } from "../../config/setup";

function HomeScreen() {
  const { data: bookings } = useQuery(["bookings"], bookingApi.get);

  const query = useQueryClient();

  const { mutate: approveBooking } = useMutation(bookingApi.approve, {
    onSuccess: () => {
      query.invalidateQueries(["bookings"]);
    },
  });
  const { mutate: completeBooking } = useMutation(bookingApi.complete, {
    onSuccess: () => {
      query.invalidateQueries(["bookings"]);
    },
  });
  const { mutate: paidBooking } = useMutation(bookingApi.paid, {
    onSuccess: () => {
      query.invalidateQueries(["bookings"]);
    },
  });

  function approve(bookingID: string) {
    approveBooking({ bookingID });
  }

  function complete(bookingID: string) {
    completeBooking({ bookingID });
  }

  function paid(bookingID: string) {
    paidBooking({ bookingID });
  }

  return (
    <div className="w-full">
      <div className="w-full bg-dark p-4 rounded-md">
        <h1 className="text-light font-bold">Bookings</h1>
        <p className="text-gray-300 text-xs italic">Total Bookings: {bookings?.data.data.length} </p>
      </div>

      <div className="overflow-auto rounded-lg shadow m-3">
        <table className="w-full table-fixed">
          <thead className="bg-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className={classNames("p-2", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Date</th>
              <th className={classNames("p-2", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Start Time</th>
              <th className={classNames("p-2", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>End Time</th>
              <th className={classNames("p-2", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Customer</th>
              <th className={classNames("p-2", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Service</th>
              <th className={classNames("p-2", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Barber</th>
              <th className={classNames("p-2", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}>Total Amount</th>
              <th className={classNames("p-2", "text-sm", "font-semibold", "tracking-wide", "text-left", "overflow-hidden", "overflow-ellipsis", "whitespace-nowrap")}></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 ">
            {bookings?.data.data.map((booking, index) => (
              <tr className={`${(index + 1) % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
                <td className={classNames("group", "p-2", "text-xs", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>{booking.bookingSchedule.BookingDate}</td>
                <td className={classNames("group", "p-2", "text-xs", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>{booking.bookingSchedule.BookingStartTime}</td>
                <td className={classNames("group", "p-2", "text-xs", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>{booking.bookingSchedule.BookingEndTime}</td>
                <td className={classNames("group", "p-2", "text-xs", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>{booking.customer.customerName}</td>
                <td className={classNames("group", "p-2", "text-xs", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>{booking.service.serviceName}</td>
                <td className={classNames("group", "p-2", "text-xs", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>{booking.barber.barberName}</td>
                <td className={classNames("group", "p-2", "text-xs", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>{booking.bookingTotalAmount}</td>
                <td className={classNames("group", "p-2", "text-xs", "text-gray-700", "whitespace-nowrap", "overflow-hidden", "overflow-ellipsis")}>
                  <Button
                    className={`w-[100px] ${booking.statusID === BOOKING_TYPES.COMPLETED ? "bg-green-400" : "bg-dark"}`}
                    text={
                      booking.statusID === BOOKING_TYPES.PENDING ? "Approve" : booking.statusID === BOOKING_TYPES.APPROVED ? "Complete" : booking.statusID === BOOKING_TYPES.COMPLETED ? "Pay" : "Paid"
                    }
                    onClick={() => {
                      if (booking.statusID === BOOKING_TYPES.PENDING) {
                        approve(`${booking.bookingID}`);
                      } else if (booking.statusID === BOOKING_TYPES.APPROVED) {
                        complete(`${booking.bookingID}`);
                      } else if (booking.statusID === BOOKING_TYPES.COMPLETED) {
                        paid(`${booking.bookingID}`);
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomeScreen;
