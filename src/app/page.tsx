import Image from "next/image";
import Link from "next/link";
const HomePage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Link
        className="flex flex-col items-center justify-center gap-3"
        href="/fsw-donalds"
      >
        <Image src="/dine_in.png" alt="fsw donalds" width={50} height={50} />
        <h1 className="font-semibold text-xl">SFW DONALDS</h1>
      </Link>
    </div>
  );
};

export default HomePage;
