import { GoBack, LoginForm } from "../uiComponents";
import Image from "next/image";

export default function loginPage() {
  return (
    <section className="mx-auto">
      <div className="grid md:grid-cols-2 gap-4 justify-center items-center">
        <div className="p-2 md:p-5 flex flex-col justify-center items-center">
          <div className="self-start mb-4">
            <GoBack />
          </div>
          <LoginForm />
        </div>

        <div className="hidden md:block md:max-h-screen md:overflow-hidden ">
          <Image
            className="w-full h-full object-cover"
            src="/login-image.jpeg"
            alt="login-image"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
