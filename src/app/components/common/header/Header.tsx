import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-[60px] bg-secondary text-primary py-4 px-6 grid grid-cols-[auto,1fr]">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/logo.png"
          alt="로고"
          width={90}
          height={100}
          className="max-md:w-[80%] w-auto"
        />
      </Link>
      <div className="text-center self-center">
        <h1 className="max-md:text-xl text-lightBase text-2xl font-bold">
          강의 정보 게시판
        </h1>
      </div>
    </header>
  );
};

export default Header;
