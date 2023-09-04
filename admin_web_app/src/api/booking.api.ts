import { axiosInstance } from "../config/axios";

interface BookingSchedule {
  bookingScheduleID: number;
  bookingDayOfTheWeek: string;
  BookingDate: string;
  BookingStartTime: string;
  BookingEndTime: string;
}

interface Customer {
  customerName: string;
}

interface Service {
  serviceName: string;
}

interface Barber {
  barberName: string;
}

interface Booking {
  bookingID: number;
  customerID: number;
  shopID: number;
  barberID: number;
  serviceID: number;
  bookingTotalAmount: number;
  statusID: number;
  bookingSchedule: BookingSchedule;
  customer: Customer;
  service: Service;
  barber: Barber;
}

interface GetBookingRes {
  data: Booking[];
}

interface ApproveBookingInput {
  bookingID: string;
}

function get() {
  return axiosInstance.get<GetBookingRes>("/booking");
}

function approve(data: ApproveBookingInput) {
  return axiosInstance.patch("/booking/approve", data);
}
function complete(data: ApproveBookingInput) {
  return axiosInstance.patch("/booking/complete", data);
}
function paid(data: ApproveBookingInput) {
  return axiosInstance.patch("/booking/paid", data);
}

export { get, approve, complete, paid };
