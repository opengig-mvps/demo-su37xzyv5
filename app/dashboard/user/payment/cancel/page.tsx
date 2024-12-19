"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const PaymentCancelPage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard/user/donations");
  };

  useEffect(() => {
    // Redirect to donations page after 5 seconds
    const timer = setTimeout(() => {
      handleRedirect();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Alert className="max-w-md w-full">
        <AlertTitle>Payment Cancelled</AlertTitle>
        <AlertDescription>
          Your donation payment has been cancelled. You will be redirected to
          the donation history page shortly.
        </AlertDescription>
      </Alert>
      <Button onClick={handleRedirect} className="mt-4">
        Go to Donation History
      </Button>
    </div>
  );
};

export default PaymentCancelPage;