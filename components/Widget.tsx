import { SearchIcon } from "@heroicons/react/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import React from "react";

function Widget() {
  return (
    <div className="border-l space-y-5 px-5 lg:col-span-3 hidden md:col-span-4 md:inline">
      {/* search */}
      <div className="mt-2 flex items-center space-x-2 rounded-lg bg-white p-3">
        <SearchIcon className="w-5 h-5 text-baraan" />
        <input
          type="text"
          placeholder="Хайлт хийх"
          className="flex-1 bg-transparent outline-none"
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="saurabhnemade"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widget;
