export default function Footer(){
    const year = new Date().getFullYear();
    return(
        <footer className='flex justify-center items-center py-20 text-muted-foreground '>
            <p className='text-sm'>&copy; {year} BookWorm. All rights reserved. Made with ❤️ for readers everywhere.</p>
        </footer>
    )
}