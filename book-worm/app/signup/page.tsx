import { GoBack, SingupForm } from "../uiComponents";
import Image from "next/image";

export default function loginPage() {
  return (
    <section className="mx-auto">
      <div className="grid md:grid-cols-2 gap-4 justify-center items-center">
        <div className="hidden md:block md:min-h-screen md:overflow-hidden relative ">
          <Image
            className="w-full h-full object-cover brightness-50"
            src="/signup-image.jpeg"
            alt="login-image"
            width={500}
            height={500}
          />
          <div className="absolute bottom-50 p-2 ">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">
              Start Your Reading Adventure
            </h2>
            <p className="text-lg sm:text:xl text-muted-foreground">
              Join a community of passionate readers and transform the way you
              experience books.
            </p>
          </div>
        </div>
        <div className="p-2 md:p-5 flex flex-col justify-center items-center">
          <div className="self-start mb-4">
            <GoBack />
          </div>
          <SingupForm />
        </div>
      </div>
    </section>
  );
}
