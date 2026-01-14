import Link from "next/link";
import Image from "next/image";
export default function HeroSection(){

    return(
        <div className='grid md:grid-cols-2 items-center gap-12 py-20 px-10'>
            <div className='max-w-150 flex flex-col gap-8' >
                <h2 className='text-left text-6xl font-semibold'>Your Personal Reading Journey Starts Here.</h2>
                <p className='text-left text-muted-foreground text-xl'>Track your reading progress, discover new books, and join a community of passionate readers.</p>
                <div className='flex gap-5 items-center'>
                    <Link href='/signup'><button className='rounded-lg bg-primary px-4 py-2 cursor-pointer text-primary-foreground text-xl'>Start Reading</button></Link>
                    <Link href='/about'><button className='rounded-lg border border-border px-4 py-2 cursor-pointer bg-popover text-xl'>Learn More</button></Link>
                </div>
            </div>
            <div className='rounded-2xl overflow-hidden shadow-2xl h-100 md:h-125'>
                <Image className='object-cover h-full w-full' src='/hero-image.jpeg' alt='hero-image' width={1080} height={1595} />
            </div>
        </div>
    )
}