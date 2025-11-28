import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const search = searchParams.get('search')
    const skip = (page - 1) * limit

    const where: any = {}
    
    if (status && status !== 'all') {
      where.status = status
    }

    if (type && type !== 'all') {
      where.applicationType = type === 'Direct Sponsorship' ? 'direct-sponsorship' : 'scholarship-help'
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [applications, total] = await Promise.all([
      prisma.scholarshipApplication.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.scholarshipApplication.count({ where }),
    ])

    const formattedApplications = applications.map((app) => ({
      id: app.id,
      name: `${app.firstName} ${app.lastName}`,
      email: app.email,
      type: app.applicationType === 'direct-sponsorship' ? 'Direct Sponsorship' : 'Scholarship Help',
      date: app.createdAt.toISOString().split('T')[0],
      status: app.status,
      amount: app.requestedAmount ? Number(app.requestedAmount) : 0,
      academicLevel: app.academicLevel,
    }))

    return NextResponse.json({
      success: true,
      requests: formattedApplications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID and status are required' },
        { status: 400 }
      )
    }

    const application = await prisma.scholarshipApplication.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({
      success: true,
      application: {
        id: application.id,
        status: application.status,
      },
    })
  } catch (error) {
    console.error('Error updating request status:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update request status' },
      { status: 500 }
    )
  }
}

