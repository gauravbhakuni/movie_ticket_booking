import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth'

const Session = async () => {
    const session = await getServerSession(authOptions);
    return session;
}

export default Session