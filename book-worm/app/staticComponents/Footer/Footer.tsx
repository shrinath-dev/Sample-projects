export default function Footer(){
    const year = new Date().getFullYear();
    return(
        <footer className='flex justify-center items-center py-5 text-muted-foreground '>
            <p>&copy; {year} BookWorm. All rights reserved. </p>
        </footer>
    )
}