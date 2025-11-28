import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const donationSchema = z.object({
  amount: z.string().min(1, 'Amount is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  cardNumber: z.string().optional(),
  billingAddress: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  message: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = donationSchema.parse(body)
    
    // Find or create donor
    let donor = await prisma.donor.findUnique({
      where: { email: validatedData.email },
    })

    if (!donor) {
      donor = await prisma.donor.create({
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          billingAddress: validatedData.billingAddress,
          city: validatedData.city,
          zipCode: validatedData.zipCode,
          country: validatedData.country,
        },
      })
    } else {
      // Update donor info if provided
      donor = await prisma.donor.update({
        where: { id: donor.id },
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          billingAddress: validatedData.billingAddress,
          city: validatedData.city,
          zipCode: validatedData.zipCode,
          country: validatedData.country,
        },
      })
    }

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        amount: validatedData.amount,
        currency: 'USD',
        message: validatedData.message,
        paymentStatus: 'Pending', // Will be updated when payment is processed
        donorId: donor.id,
      },
    })

    return NextResponse.json(
      {
        success: true,
        donation: {
          id: donation.id,
          amount: donation.amount,
          status: donation.paymentStatus,
        },
        donor: {
          id: donor.id,
          email: donor.email,
        },
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    const errorMessage = error instanceof Error ? error.message : 'Failed to process donation'
    console.error('Donation creation error:', error)
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        skip,
        take: limit,
        include: {
          donor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.donation.count(),
    ])

    return NextResponse.json({
      success: true,
      donations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching donations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}

