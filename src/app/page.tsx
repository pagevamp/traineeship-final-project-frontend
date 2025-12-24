import { SideBar } from '@/components/common/SideBar';
import { Icon } from '@iconify/react';

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center font-sans bg-primary-100 max-screen-full grid grid-cols-2">
      <Icon icon='mingcute:menu-fill'/>
       <SideBar />
    </div>
  );
}
