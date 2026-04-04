import Header from "./components/home/Header";
import QuickActions from "./components/home/QuickActions";

export default function Home() {
  return (
    <main className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <Header />          
      <QuickActions />
    </main>
  );
}
