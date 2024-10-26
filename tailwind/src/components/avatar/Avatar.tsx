import React from "react";
import { baseUrl } from "../../api/config";

interface avtProps {
  size: Number;
  url: string;
}
export const Avatar: React.FC<avtProps> = ({ size, url }: avtProps) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      className="rounded-full"
    >
      <img
        width={`${size}px`}
        height={`${size}px`}
        src={`${url ? "http://localhost:8080/image-byte/" + url : "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg"}`}
        alt=""
        style={{
          borderRadius: "100%",
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "cover",
        }}
      />
    </div>
  );
};
