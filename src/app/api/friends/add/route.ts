import { authOptions } from '@/lib/auth'
import { addFriendValidator } from '@/lib/validations/add-friend'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email: emailToAdd } = addFriendValidator.parse(body.email)

    const RestResponse = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${emailToAdd}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: 'no-store',
      },
    )

    const data = (await RestResponse.json()) as { result: string | null }

    const idToAdd = data.result

    if (!idToAdd) {
      return new Response('This user does not exist', { status: 400 })
    }

    const session = getServerSession(authOptions)
    if (!session) {
      return new Response('Unauthorized Access', { status: 401 })
    }

    if (idToAdd === session?.user?.id) {
      return new Response(
        'This action is invalid, you cannot add yourself as a friend',
        { status: 400 },
      )
    }
  } catch (error) {}
}
