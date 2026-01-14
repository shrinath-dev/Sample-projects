import { HeroSection } from "../staticComponents"
import { Library, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function LandingPage(){

  return(
    <>

    <section>
      <HeroSection />
    </section>

    <section className='px-10 py-20 bg-muted/30'>
      <h2 className='text-4xl font-semibold  text-center mb-12'>Why Choose BookWorm?</h2>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        <div className='border border-border rounded-2xl bg-card p-6'>
          <Library className="w-12 h-12 mb-4 text-primary"/>
          <h3 className='text-xl font-semibold mb-3'>Organise Your Library</h3>
          <p className='text-muted-foreground'>Keep track of all your books in one place. Create custom shelves and organize by genre, author, or reading status.</p>
        </div>

        <div className='border border-border rounded-2xl bg-card p-6'>
          <TrendingUp className="w-12 h-12 mb-4 text-primary" />
          <h3 className='text-xl font-semibold mb-3'>Track Progress</h3>
          <p className='text-muted-foreground'>Monitor your reading progress with beautiful statistics and insights. Set goals and achieve them.</p>
        </div>

        <div className='border border-border rounded-2xl bg-card p-6'>
          <Users className="w-12 h-12 mb-4 text-primary" />
          <h3 className='text-xl font-semibold mb-3'>Join Community</h3>
          <p className='text-muted-foreground'>Connect with fellow readers, share reviews, and discover your next favorite book through recommendations.</p>
        </div>
      </div>
    </section>

    <section className="px-10 py-20">
      <div className='grid md:grid-cols-3 gap-8 text-center'>
        <div>
          <h3 className='text-5xl text-primary font-bold mb-2'>100K+</h3>
          <p className='text-lg text-muted-foreground'>Active Readers</p>
        </div>

        <div>
          <h3 className='text-5xl text-primary font-bold mb-2'>2M+</h3>
          <p className='text-lg text-muted-foreground'>Books Tracked</p>
        </div>

        <div>
          <h3 className='text-5xl text-primary font-bold mb-2'>50K+</h3>
          <p className='text-lg text-muted-foreground'>Reviews Shared</p>
        </div>
      </div>
    </section>

    <section className="px-10 py-20 bg-primary text-primary-foreground">
      <div className='flex flex-col justify-center items-center text-center'>
      <h2 className='text-4xl font-bold mb-6'>Ready to Transform Your Reading Experience?</h2>
      <p className='text-xl mb-6 opacity-90'>Join thousands of readers who have already discovered the joy of organized reading.</p>
      <Link href='/signup'><button className='text-xl px-6 py-2 cursor-pointer bg-secondary rounded-lg  text-secondary-foreground'>Create Free Account</button></Link>
      </div>
    </section>
    
    </>
  )
}