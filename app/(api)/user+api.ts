import { neon } from '@neondatabase/serverless';


export async function POST(request: Request) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {

    } return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
    )
    try {

    } catch (error) {

    }
}

// const posts = await sql('SELECT * FROM posts');

// See https://neon.tech/docs/serverless/serverless-driver
// for more information