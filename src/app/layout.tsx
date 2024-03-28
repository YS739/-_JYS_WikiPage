import type { Metadata } from "next";
import Header from "./components/common/header/Header";
import Recoil from "./components/root/Recoil";
import "./globals.css";

export const metadata: Metadata = {
  title: "CODINGHUB_WikiPage",
  description: "Information about CodingHub lecture",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body>
        <Recoil>
          <Header />
          {children}
        </Recoil>
      </body>
    </html>
  );
};

export default RootLayout;
