'use client';

import { useState, useEffect } from 'react';
import axios, { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { LoaderCircleIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const DonationHistoryPage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${session?.user?.id}/donations`, {
          params: { page: currentPage },
        });
        setDonations(res?.data?.data);
        setTotalPages(res?.data?.totalPages);
      } catch (error: any) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? 'Something went wrong');
        } else {
          console.error(error);
          toast.error('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, [session, currentPage]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Donation History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Donations</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center">
              <LoaderCircleIcon className="animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount (USD)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations?.map((donation: any) => (
                  <TableRow key={donation?.id}>
                    <TableCell>{new Date(donation?.paymentDate).toLocaleDateString()}</TableCell>
                    <TableCell>{donation?.amount?.toFixed(2)}</TableCell>
                    <TableCell>{donation?.paymentStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DonationHistoryPage;