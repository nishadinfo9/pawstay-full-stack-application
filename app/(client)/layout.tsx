import type { Metadata } from 'next'
import '@/app/globals.css'
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Container from '@/components/container/container';


export const metadata: Metadata = {
  title: 'Home',
  description: 'Home',
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>
          {children}
      </main>
      <Footer />
    </>
  );
};

export default layout;