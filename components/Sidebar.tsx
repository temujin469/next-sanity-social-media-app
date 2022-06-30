import React from 'react'
import SidebarRow from './SidebarRow'

import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    MailIcon,
    UserIcon,
    HomeIcon
} from "@heroicons/react/outline"
import { useSession ,signIn,signOut } from 'next-auth/react'

function Sidebar() {

  const {data:session} = useSession()

  return (
    <div className='lg:flex lg:col-span-3 flex-col hidden items-start px-5 border-r'>
        <img className='m-4 h-10 w-10' src="https://yt3.ggpht.com/ytc/AKedOLQNbjtQahv7BTx_EHH_LXOEPCAgjHrbfmo6EtcrJQ=s900-c-k-c0x00ffffff-no-rj" alt="logo" />
        <SidebarRow Icon={HomeIcon} title="Нүүр хуудас" />
        <SidebarRow Icon={HashtagIcon} title="Судлах" />
        <SidebarRow Icon={BellIcon} title="Мэдэгдэл" />
        <SidebarRow Icon={MailIcon} title="Зурвас" />
        <SidebarRow Icon={BookmarkIcon} title="Хадгалсан" />
        <SidebarRow Icon={CollectionIcon} title="Жагсаалт" />
        <SidebarRow Icon={UserIcon} onClick={session ? signOut : signIn} title={session ? "гарах" : "нэвтэх"} />
    </div>
  )
}

export default Sidebar