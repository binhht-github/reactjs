import React from "react";

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
        src={`${url}`}
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
