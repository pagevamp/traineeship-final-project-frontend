import { SideBar } from '@/components/common/SideBar';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <SideBar />
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-primary-100 sm:items-start">
        Traineeship Final Project
      </main>
    </div>
  );
}
