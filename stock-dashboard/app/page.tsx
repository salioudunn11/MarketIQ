import { Header } from "@/packages/components/Header";
import { Footer } from "@/packages/components/Footer";


export default function Home() { 
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header/>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="flex flex-col justify-center">
        <img
        src={}> 
        
        </img>
        </div>  


      </main>
      <Footer/>
    </div>
  );
}
