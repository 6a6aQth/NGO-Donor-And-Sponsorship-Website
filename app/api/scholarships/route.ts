import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const scholarshipSchema = z.object({
  applicationType: z.enum(['scholarship-help', 'direct-sponsorship']),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  currentSchool: z.string().min(1, 'Current school is required'),
  academicLevel: z.enum(['High School', 'Undergraduate', 'Graduate', 'Postgraduate']),
  gpa: z.string().optional(),
  intendedMajor: z.string().optional(),
  financialNeed: z.string().min(1, 'Financial need description is required'),
  essay: z.string().min(1, 'Personal statement is required'),
  additionalInfo: z.string().optional(),
  requestedAmount: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = scholarshipSchema.parse(body)
    
    // Parse date of birth if provided
    let dateOfBirth: Date | undefined
    if (validatedData.dateOfBirth) {
      dateOfBirth = new Date(validatedData.dateOfBirth)
    }

    // Parse GPA if provided
    let gpa: number | undefined
    if (validatedData.gpa) {
      gpa = parseFloat(validatedData.gpa)
    }

    // Parse requested amount if provided
    let requestedAmount: number | undefined
    if (validatedData.requestedAmount) {
      requestedAmount = parseFloat(validatedData.requestedAmount)
    }

    // Create scholarship application
    const application = await prisma.scholarshipApplication.create({
      data: {
        applicationType: validatedData.applicationType,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        dateOfBirth: dateOfBirth,
        currentSchool: validatedData.currentSchool,
        academicLevel: validatedData.academicLevel,
        gpa: gpa,
        intendedMajor: validatedData.intendedMajor,
        financialNeed: validatedData.financialNeed,
        essay: validatedData.essay,
        additionalInfo: validatedData.additionalInfo,
        requestedAmount: requestedAmount,
        status: 'Pending',
      },
    })

    return NextResponse.json(
      {
        success: true,
        application: {
          id: application.id,
          type: application.applicationType,
          status: application.status,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Scholarship application error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const skip = (page - 1) * limit

    const where: any = {}
    if (status && status !== 'all') {
      where.status = status
    }
    if (type && type !== 'all') {
      where.applicationType = type
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

    return NextResponse.json({
      success: true,
      applications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching scholarship applications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

