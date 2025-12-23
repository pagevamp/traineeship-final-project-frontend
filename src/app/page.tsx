import { SideBar } from "@/components/common/SideBar";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-primary-100 max-screen-full gird grid-cols-2">
      <SideBar />
      <main className="h-screen w-full  justify-between py-10 px-16 bg-card-bg-100 text-text-two-100">
        <div className="p-6 rounded-2xl flex flex-col items-center gap-12 text-center text-3xl text-shadow-sm text-shadow-primary-100 font-extrabold">
          <p>
            An In-House ride-sharing web app built for{" "}
            <span className="text-text-one-100 text-shadow-sm text-shadow-text-two-100">
              Outside Studio
            </span>
          </p>
          <p>
            Easily request rides and find rides, and travel together—securely
            and effortlessly.
          </p>
          <p>
            Built with care by{" "}
            <span className="text-text-one-100 text-shadow-sm text-shadow-text-two-100">
              Laxman Rumba
            </span>{" "}
            &amp{" "}
            <span className="text-text-one-100 text-shadow-sm text-shadow-text-two-100">
              Stuti Upreti
            </span>
          </p>
          <p>
            Designed to make daily commutes simpler, smarter, and more
            connected.
          </p>
        </div>
      </main>
    </div>
  );
}
