import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [totalDonations, totalDonors, totalRequests, pendingRequests] = await Promise.all([
      prisma.donation.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          paymentStatus: 'Completed',
        },
      }),
      prisma.donor.count(),
      prisma.scholarshipApplication.count(),
      prisma.scholarshipApplication.count({
        where: {
          status: 'Pending',
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalDonations: Number(totalDonations._sum.amount || 0),
        totalDonors: totalDonors,
        totalRequests: totalRequests,
        pendingRequests: pendingRequests,
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

