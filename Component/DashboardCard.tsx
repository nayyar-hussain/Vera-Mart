import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface IDashboardProps {
  resLength: number;
  orderLength: number;
  orderTotal: number;
}

function DashboardCard({
  resLength,
  orderLength,
  orderTotal,
}: IDashboardProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{resLength}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{orderLength}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Earning</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">£{orderTotal}</p>
        </CardContent>
      </Card>
    </>
  );
}

export default DashboardCard;
