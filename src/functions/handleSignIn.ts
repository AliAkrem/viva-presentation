import { supabaseBrowserClient } from "@/utils/SuperbaseClients"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context"


type Props = {

    loginCredentials: {
        email: string,
        password: string
    }
    router: AppRouterInstance,

    setLoginLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

export default async function handleSignIn({ loginCredentials, router, setLoginLoading }: Props) {




    const { error } = await supabaseBrowserClient.auth.signInWithPassword({
        email: loginCredentials.email,
        password: loginCredentials.password,

    })

    if (error) {
        router.push('/login?error=badLoginCredentials')
    } else {
        router.push('/')

    }
    setLoginLoading(false)











}
