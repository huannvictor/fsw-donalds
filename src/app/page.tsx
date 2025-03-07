import Image from "next/image";
import Link from "next/link";
const HomePage = () => {
  return (
    <div
      className="
        mx-auto flex h-full w-[80%] flex-col items-center justify-center gap-20 p-10
        md:grid md:w-[80%] md:grid-cols-3 md:flex-row
      "
    >
      <section
        className="
          flex flex-col items-center justify-center gap-5 text-center 
          md:col-span-2 md:text-left
        "
      >
        <h1 className="font-semibold text-2xl md:font-bold md:text-4xl">
          Onde você gostaria de matar sua fome hoje?
        </h1>
        <p className=" text-base text-gray-400 md:text-xl">
          Escolha entre uma variedade de restaurantes e descubra novos sabores.
          Temos opções para todos os gostos!
        </p>
      </section>
      <section className="flex flex-col items-center justify-center gap-10">
        <Link
          className="flex flex-col items-center justify-center gap-3"
          href="/fsw-donalds"
        >
          <Image
            src="/fsw_donalds.png"
            alt="fsw donalds"
            width={50}
            height={50}
          />
          <h1 className="font-semibold text-lg">SFW DONALDS</h1>
        </Link>

        <Link
          className="flex cursor-not-allowed flex-col items-center justify-center gap-3 opacity-50"
          href="/"
        >
          <Image src="/dine_in.png" alt="" width={50} height={50} />
          <h1 className="font-semibold text-lg">Seu restaurante aqui</h1>
        </Link>

        <Link
          className="flex cursor-not-allowed flex-col items-center justify-center gap-3 opacity-50"
          href="/"
        >
          <Image src="/dine_in.png" alt="" width={50} height={50} />
          <h1 className="font-semibold text-lg">Seu restaurante aqui</h1>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
