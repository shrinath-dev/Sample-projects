import { Navbar, Footer } from "../staticComponents";

export default function RootLayout({
    children,
}:Readonly<{children: React.ReactNode}>){

    return(
        <>
        <Navbar />
        <main>
            {children}
        </main>
        <Footer />
        </>
    );
}