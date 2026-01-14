import Link from "next/link"
import { BookOpenText } from "lucide-react"

export default function Navbar(){

    return(
            <nav className={`bg-popover/20 shadow-lg backdrop-filter backdrop-blur-sm sticky top-0 left-0 right-0 sm:flex justify-between items-center px-10 py-2 border-b border-b-border/20`}>
                <div className={`p-4 flex gap-4 justify-center items-center`}>
                    <BookOpenText className='w-10 h-10 text-primary' />
                    <Link href='/'><h1 className='text-2xl font-semibold text-center'>BookWorm</h1></Link>
                </div>

                <div className={`flex gap-6 justify-center items-center`}>
                    <div >
                        <Link href='/login'><button className={`rounded-lg border border-border px-4 py-2 cursor-pointer bg-popover text-sm`}>Login</button></Link>
                    </div>
                    <div>
                        <Link href='/signup'><button className={`rounded-lg bg-primary px-4 py-2 cursor-pointer text-primary-foreground text-sm`}>Get Started</button></Link>
                    </div>
                </div>
            </nav>
    )
}