import { CardCar } from "../components/CardCar";
import { CardRevenue } from "../components/CardRevenue";
import { CardUser } from "../components/CardUser";
import { RecentBooking } from "../components/RecentBooking";

export function Dashboard() {
  return (
    <>
      <div className="max-w-7xl flex gap-6">
        <div className="w-[30%]">
          <CardRevenue />
        </div>
        <div className="w-[30%]">
          <CardCar />
        </div>
        <div className="w-[30%]">
          <CardUser />
        </div>
      </div>
      <div className="w-5/6">
        <RecentBooking />
      </div>
    </>
  );
}

export default Dashboard;