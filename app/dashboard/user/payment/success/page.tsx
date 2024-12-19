"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import api from "@/lib/api";

const PaymentSuccessPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [donationHistory, setDonationHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonationHistory = async () => {
      if (!session?.user?.id) return;
      setLoading(true);
      try {
        const response = await api.get(`/api/users/${session?.user?.id}/donations`);
        if (response?.data?.success) {
          setDonationHistory(response?.data?.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationHistory();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircleIcon className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Alert className="max-w-md w-full">
        <AlertTitle>Payment Successful!</AlertTitle>
        <AlertDescription>
          Thank you for your donation. Your payment has been successfully processed.
        </AlertDescription>
      </Alert>
      <Button className="mt-6" onClick={() => router.push("/dashboard/user")}>
        Go to Dashboard
      </Button>

      <div className="mt-10 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Donation History</h2>
        {donationHistory.length === 0 ? (
          <p>No donation history available.</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Payment Status</th>
                <th className="py-2 px-4 border-b">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory?.map((donation: any) => (
                <tr key={donation?.id}>
                  <td className="py-2 px-4 border-b">${donation?.amount}</td>
                  <td className="py-2 px-4 border-b">{donation?.paymentStatus}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(donation?.paymentDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;