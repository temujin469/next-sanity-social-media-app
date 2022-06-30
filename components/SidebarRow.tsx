import React from "react";

interface Props {
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?:()=>{}
}

function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div onClick={() => onClick?.()} className="group flex max-w-fit cursor-pointer items-center space-x-2 rounded-lg px-4 py-3 hover:bg-gray-200 transition-all duration-200">
      <Icon className="h-6 w-6" />
      <p className="group-hover:text-root text-harBaraan hidden md:inline-flex text-base lg:text-xl">{title}</p>
    </div>
  );
}
export default SidebarRow;
