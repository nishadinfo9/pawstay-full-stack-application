import db, { testDatabaseConnection } from "@/lib/db";
import { bookings, bookingServices, invoiceItems, invoices, payments, pets, rooms, services, users } from "@/lib/schema";

export async function POST(request: Request, response: Response) {
    const body = await request.json()

    console.log(body)

    if (!body) {
        return Response.json('body is empty')
    }

    try {
        await testDatabaseConnection()
        await db.insert(payments).values(body).returning()

        return Response.json('payments created', { status: 201 })
    } catch (error) {
        console.log('error: ', error)
    }
}

export async function GET(request: Request, response: Response) {
    return Response.json('running', {status: 200})
}