import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const skip = (page - 1) * limit

    const where: any = {}
    
    if (status && status !== 'all') {
      where.status = status
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [donors, total] = await Promise.all([
      prisma.donor.findMany({
        where,
        skip,
        take: limit,
        include: {
          donations: {
            select: {
              id: true,
              amount: true,
              paymentStatus: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.donor.count({ where }),
    ])

    // Calculate total donations and donation count for each donor
    const donorsWithStats = donors.map((donor) => {
      const totalDonations = donor.donations
        .filter((d) => d.paymentStatus === 'Completed')
        .reduce((sum, d) => sum + Number(d.amount), 0)
      const donationCount = donor.donations.filter((d) => d.paymentStatus === 'Completed').length
      const lastDonation = donor.donations[0]?.createdAt || null

      return {
        id: donor.id,
        name: `${donor.firstName} ${donor.lastName}`,
        email: donor.email,
        phone: donor.phone,
        totalDonations: totalDonations,
        lastDonation: lastDonation ? lastDonation.toISOString().split('T')[0] : null,
        donationCount,
        status: donor.status,
      }
    })

    return NextResponse.json({
      success: true,
      donors: donorsWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching donors:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donors' },
      { status: 500 }
    )
  }
}

