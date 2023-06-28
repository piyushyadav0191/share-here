import Input from "@/components/Input";
import OtherMessage from "@/components/OtherMessage";
import React from "react";

function page() {
  return (
    <div>
      <div className="bg-white">
        <Input />
      </div>
      <div className="mt-[100px]">
        <OtherMessage />
      </div>
    </div>
  );
}

export default page;
