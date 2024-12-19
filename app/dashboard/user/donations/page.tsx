'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { isAxiosError } from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderCircleIcon } from 'lucide-react';
import api from '@/lib/api';

const donationSchema = z.object({
  amount: z.coerce.number().positive({ message: 'Please enter a valid positive number' }),
  cardNumber: z.string().min(16, { message: 'Card number must be 16 digits' }).max(16, { message: 'Card number must be 16 digits' }),
  expiryDate: z.string().min(5, { message: 'Expiry date must be in MM/YY format' }).max(5, { message: 'Expiry date must be in MM/YY format' }),
  cvv: z.string().min(3, { message: 'CVV must be 3 digits' }).max(3, { message: 'CVV must be 3 digits' })
});

type DonationFormData = z.infer<typeof donationSchema>;

const DonationForm: React.FC = () => {
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: undefined,
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  });

  const onSubmit = async (data: DonationFormData) => {
    try {
      const payload = {
        amount: data?.amount,
        paymentDetails: {
          cardNumber: data?.cardNumber,
          expiryDate: data?.expiryDate,
          cvv: data?.cvv
        }
      };

      const response = await api.post('/api/donations', payload);

      if (response?.data?.success) {
        toast.success('Donation initiated successfully! Redirecting to payment...');
        window.location.href = response?.data?.data?.sessionUrl;
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? 'Something went wrong');
      } else {
        console.error(error);
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Donate Now</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Donation Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount (USD)</Label>
              <Input
                type="number"
                {...register('amount', { valueAsNumber: true })}
                placeholder="Enter donation amount"
              />
              {errors?.amount && <p className="text-red-500 text-sm">{errors?.amount?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                {...register('cardNumber')}
                placeholder="Enter card number"
              />
              {errors?.cardNumber && <p className="text-red-500 text-sm">{errors?.cardNumber?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
              <Input
                {...register('expiryDate')}
                placeholder="Enter expiry date"
              />
              {errors?.expiryDate && <p className="text-red-500 text-sm">{errors?.expiryDate?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                {...register('cvv')}
                placeholder="Enter CVV"
              />
              {errors?.cvv && <p className="text-red-500 text-sm">{errors?.cvv?.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Processing Donation...
                </>
              ) : (
                'Donate Now'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default DonationForm;