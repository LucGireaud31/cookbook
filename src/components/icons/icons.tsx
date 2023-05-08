import * as React from "react";
import { View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { background, theme } from "../../theme/colors";

interface SVGProps {
  size?: number;
  orientation?: "left" | "right" | "top" | "bottom";
  color?: string;
  weight?: "bold" | "normal";
}

export function LinkIcon(props: SVGProps) {
  const { size = 32, color = "black" } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M136.37 187.53a12 12 0 010 17l-5.94 5.94a60 60 0 01-84.88-84.88l24.12-24.11A60 60 0 01152 99a12 12 0 11-16 18 36 36 0 00-49.37 1.47l-24.1 24.08a36 36 0 0050.92 50.92l5.94-5.94a12 12 0 0116.98 0zm74.08-142a60.09 60.09 0 00-84.88 0l-5.94 5.94a12 12 0 0017 17l5.94-5.94a36 36 0 0150.92 50.92l-24.11 24.12A36 36 0 01120 139a12 12 0 10-16 18 60 60 0 0082.3-2.43l24.12-24.11a60.09 60.09 0 00.03-84.91z" />
    </Svg>
  );
}

export function HistoryIcon(props: SVGProps) {
  const { size = 25, color = "black" } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M140 80v41.21l34.17 20.5a12 12 0 11-12.34 20.58l-40-24A12 12 0 01116 128V80a12 12 0 0124 0zm-12-52a99.38 99.38 0 00-70.76 29.34c-4.69 4.74-9 9.37-13.24 14V64a12 12 0 00-24 0v40a12 12 0 0012 12h40a12 12 0 000-24H57.77c5.23-6 10.6-11.78 16.49-17.74a76 76 0 111.58 109 12 12 0 00-16.48 17.46A100 100 0 10128 28z" />
    </Svg>
  );
}

export function DownloadIcon(props: SVGProps) {
  const { size = 32 } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill="black"
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M228 152v56a20 20 0 01-20 20H48a20 20 0 01-20-20v-56a12 12 0 0124 0v52h152v-52a12 12 0 0124 0zm-108.49 8.49a12 12 0 0017 0l40-40a12 12 0 00-17-17L140 123V40a12 12 0 00-24 0v83l-19.51-19.49a12 12 0 00-17 17z" />
    </Svg>
  );
}

export function DotMenuIcon(props: SVGProps) {
  const { size = 25 } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={theme[400]}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M112 60a16 16 0 1116 16 16 16 0 01-16-16zm16 52a16 16 0 1016 16 16 16 0 00-16-16zm0 68a16 16 0 1016 16 16 16 0 00-16-16z" />
    </Svg>
  );
}

export function EyeIcon(props: SVGProps) {
  const { size = 30, color = "black" } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 000 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 000-6.5zM128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0125 128a133.33 133.33 0 0123.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 01231.05 128c-7.21 13.46-38.62 64-103.05 64zm0-112a48 48 0 1048 48 48.05 48.05 0 00-48-48zm0 80a32 32 0 1132-32 32 32 0 01-32 32z" />
    </Svg>
  );
}

export function EyeSlashIcon(props: SVGProps) {
  const { size = 30, color = "black" } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M53.92 34.62a8 8 0 10-11.84 10.76l19.24 21.17C25 88.84 9.38 123.2 8.69 124.76a8 8 0 000 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208a127.11 127.11 0 0052.07-10.83l22 24.21a8 8 0 1011.84-10.76zm47.33 75.84l41.67 45.85a32 32 0 01-41.67-45.85zM128 192c-30.78 0-57.67-11.19-79.93-33.25A133.16 133.16 0 0125 128c4.69-8.79 19.66-33.39 47.35-49.38l18 19.75a48 48 0 0063.66 70l14.73 16.2A112 112 0 01128 192zm6-95.43a8 8 0 013-15.72 48.16 48.16 0 0138.77 42.64 8 8 0 01-7.22 8.71 6.39 6.39 0 01-.75 0 8 8 0 01-8-7.26A32.09 32.09 0 00134 96.57zm113.28 34.69c-.42.94-10.55 23.37-33.36 43.8a8 8 0 11-10.67-11.92 132.77 132.77 0 0027.8-35.14 133.15 133.15 0 00-23.12-30.77C185.67 75.19 158.78 64 128 64a118.37 118.37 0 00-19.36 1.57A8 8 0 11106 49.79 134 134 0 01128 48c34.88 0 66.57 13.26 91.66 38.35 18.83 18.83 27.3 37.62 27.65 38.41a8 8 0 010 6.5z" />
    </Svg>
  );
}

export function SVGCirclePlus(props: SVGProps) {
  const { size = 25 } = props;
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 256 256">
      <Path d="M0 0H256V256H0z" />
      <Circle
        cx={128}
        cy={128}
        r={96}
        fill={background}
        stroke={theme[400]}
        strokeMiterlimit={10}
        strokeWidth={16}
      />
      <Path
        fill="none"
        stroke={theme[400]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M88 128L168 128"
      />
      <Path
        fill="none"
        stroke={theme[400]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M128 88L128 168"
      />
    </Svg>
  );
}

export function DrawerIcon(props: SVGProps) {
  const { size = 25 } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={theme[400]}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        stroke={theme[400]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M40 128L216 128"
      />
      <Path
        stroke={theme[400]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M40 64L216 64"
      />
      <Path
        stroke={theme[400]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M40 192L216 192"
      />
    </Svg>
  );
}
export function GlassIcon(props: SVGProps) {
  const { size = 25 } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={theme[400]}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path fill="none" d="M0 0H256V256H0z" />
      <Circle
        cx={116}
        cy={116}
        r={84}
        fill="none"
        stroke={theme[400]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
      <Path
        fill="none"
        stroke={theme[400]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M175.4 175.4L224 224"
      />
    </Svg>
  );
}

export function FilterIcon(props: SVGProps) {
  const { size = 25 } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill="#fff"
      viewBox="0 0 256 256"
      {...props}
    >
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        d="M42.1 48h171.8a8 8 0 015.9 13.4l-65.7 72.3a7.8 7.8 0 00-2.1 5.4v56.6a7.9 7.9 0 01-3.6 6.7l-32 21.3a8 8 0 01-12.4-6.6v-78a7.8 7.8 0 00-2.1-5.4L36.2 61.4A8 8 0 0142.1 48z"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
    </Svg>
  );
}

export function FilledStarIcon(props: SVGProps) {
  const { size = 25 } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill="#ffbb00"
      viewBox="0 0 256 256"
      {...props}
    >
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path d="M239.2 97.4A16.4 16.4 0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4 0 00128 16a16.4 16.4 0 00-15.2 10.4L90.4 82.2l-59 3.8a16.5 16.5 0 00-14.6 11.4 16.8 16.8 0 005.2 18.1l45.4 38.4L53.9 207a18.5 18.5 0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1 0 008.7 2.6 16.5 16.5 0 0015.8-20.8l-14.3-58.1 45.2-37.6a16.8 16.8 0 005.2-18.1z" />
    </Svg>
  );
}

export function EmptyStartIcon(props: SVGProps) {
  const { size = 25 } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={theme[400]}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        d="M132.4 190.7l50.4 32c6.5 4.1 14.5-2 12.6-9.5l-14.6-57.4a8.7 8.7 0 012.9-8.8l45.2-37.7c5.9-4.9 2.9-14.8-4.8-15.3l-59-3.8a8.3 8.3 0 01-7.3-5.4l-22-55.4a8.3 8.3 0 00-15.6 0l-22 55.4a8.3 8.3 0 01-7.3 5.4l-59 3.8c-7.7.5-10.7 10.4-4.8 15.3L72.3 147a8.7 8.7 0 012.9 8.8L61.7 209c-2.3 9 7.3 16.3 15 11.4l46.9-29.7a8.2 8.2 0 018.8 0z"
        fill="none"
        stroke={theme[400]}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
    </Svg>
  );
}

export function FillHeartIcon(props: SVGProps) {
  const { size = 25 } = props;
  return (
    <Svg width={size} height={size} fill="red" viewBox="0 0 256 256" {...props}>
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path d="M224.6 51.9a59.5 59.5 0 00-43-19.9 60.5 60.5 0 00-44 17.6l-9.6 9.5-7.5-7.4c-23.3-23.4-61.3-25.4-84.6-4.3a59.9 59.9 0 00-2.3 87l83.1 83.1a15.9 15.9 0 0022.6 0l81-81c23.4-23.3 25.3-61.3 4.3-84.6z" />
    </Svg>
  );
}

export function EmptyHeartIcon(props: SVGProps) {
  const { size = 25 } = props;
  return (
    <Svg width={size} height={size} fill="red" viewBox="0 0 256 256" {...props}>
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        d="M133.7 211.9l81-81c19.9-20 22.8-52.7 4-73.6a52 52 0 00-75.5-2.1L128 70.5l-13.1-13.2c-20-19.9-52.7-22.8-73.6-4a52 52 0 00-2.1 75.5l83.1 83.1a8.1 8.1 0 0011.4 0z"
        fill="none"
        stroke="red"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
      />
    </Svg>
  );
}

export function CaretIcon(props: SVGProps) {
  const { size = 35, orientation, color = theme[400] } = props;

  return (
    <View>
      <Svg
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 256 256"
        style={{
          transform: [
            {
              rotate:
                orientation == "right"
                  ? "180deg"
                  : orientation == "bottom"
                  ? "-90deg"
                  : "0deg",
            },
          ],
        }}
        {...props}
      >
        <Path fill="none" d="M0 0H256V256H0z" />
        <Path
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={20}
          d="M160 208L80 128 160 48"
        />
      </Svg>
    </View>
  );
}

export function ArrowLeftIcon(props: SVGProps) {
  const { size = 25, color = theme[400] } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
        d="M216 128L40 128"
      />
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
        d="M112 56L40 128 112 200"
      />
    </Svg>
  );
}

export function PencilIcon(props: SVGProps) {
  const { size = 25, color = theme[400], weight = "normal" } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        d="M92.7 216H48a8 8 0 01-8-8v-44.7a7.9 7.9 0 012.3-5.6l120-120a8 8 0 0111.4 0l44.6 44.6a8 8 0 010 11.4l-120 120a7.9 7.9 0 01-5.6 2.3z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={weight == "normal" ? 16 : 18}
      />
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={weight == "normal" ? 16 : 18}
        d="M136 64L192 120"
      />
    </Svg>
  );
}

export function PlusIcon(props: SVGProps) {
  const { size = 30, color = theme[400] } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M224 128a8 8 0 01-8 8h-80v80a8 8 0 01-16 0v-80H40a8 8 0 010-16h80V40a8 8 0 0116 0v80h80a8 8 0 018 8z" />
    </Svg>
  );
}

export function MinusIcon(props: SVGProps) {
  const { size = 30 } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={theme[400]}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M224 128a8 8 0 01-8 8H40a8 8 0 010-16h176a8 8 0 018 8z" />
    </Svg>
  );
}

export function XIcon(props: SVGProps) {
  const { size = 25, color = "red" } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M205.66 194.34a8 8 0 01-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 01-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0111.32-11.32L128 116.69l66.34-66.35a8 8 0 0111.32 11.32L139.31 128z" />
    </Svg>
  );
}

export function TrashIcon(props: SVGProps) {
  const { size = 25, color = "red" } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M216 48h-40v-8a24 24 0 00-24-24h-48a24 24 0 00-24 24v8H40a8 8 0 000 16h8v144a16 16 0 0016 16h128a16 16 0 0016-16V64h8a8 8 0 000-16zM96 40a8 8 0 018-8h48a8 8 0 018 8v8H96zm96 168H64V64h128zm-80-104v64a8 8 0 01-16 0v-64a8 8 0 0116 0zm48 0v64a8 8 0 01-16 0v-64a8 8 0 0116 0z" />
    </Svg>
  );
}

export function LightIcon(props: SVGProps) {
  const { size = 25, color = "white", weight = "bold" } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M180 232a12 12 0 01-12 12H88a12 12 0 010-24h80a12 12 0 0112 12zm40-128a91.51 91.51 0 01-35.17 72.35A12.26 12.26 0 00180 186v2a20 20 0 01-20 20H96a20 20 0 01-20-20v-2a12 12 0 00-4.7-9.51A91.57 91.57 0 0136 104.52C35.73 54.69 76 13.2 125.79 12A92 92 0 01220 104zm-24 0a68 68 0 00-69.65-68C89.56 36.88 59.8 67.55 60 104.38a67.71 67.71 0 0026.1 53.19A35.87 35.87 0 01100 184h56.1a36.13 36.13 0 0113.9-26.51A67.68 67.68 0 00196 104zm-20.07-5.32a48.5 48.5 0 00-31.91-40 12 12 0 00-8 22.62 24.31 24.31 0 0116.09 20 12 12 0 0023.86-2.64z" />
    </Svg>
  );
}

export function CheckIcon(props: SVGProps) {
  const { size = 25, color = "green" } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M232.49 80.49l-128 128a12 12 0 01-17 0l-56-56a12 12 0 1117-17L96 183 215.51 63.51a12 12 0 0117 17z" />
    </Svg>
  );
}

export function LogoutIcon(props: SVGProps) {
  const { size = 30 } = props;
  return (
    <Svg width={size} height={size} fill="red" viewBox="0 0 256 256" {...props}>
      <Path d="M116 216a12 12 0 01-12 12H48a20 20 0 01-20-20V48a20 20 0 0120-20h56a12 12 0 010 24H52v152h52a12 12 0 0112 12zm108.49-96.49l-40-40a12 12 0 00-17 17L187 116h-83a12 12 0 000 24h83l-19.52 19.51a12 12 0 0017 17l40-40a12 12 0 00.01-17z" />
    </Svg>
  );
}

export function ScanIcon(props: SVGProps) {
  const { size = 25, color = theme[400] } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M228 40v40a12 12 0 01-24 0V52h-28a12 12 0 010-24h40a12 12 0 0112 12zM80 204H52v-28a12 12 0 00-24 0v40a12 12 0 0012 12h40a12 12 0 000-24zm136-40a12 12 0 00-12 12v28h-28a12 12 0 000 24h40a12 12 0 0012-12v-40a12 12 0 00-12-12zM40 92a12 12 0 0012-12V52h28a12 12 0 000-24H40a12 12 0 00-12 12v40a12 12 0 0012 12zm124 92H92a20 20 0 01-20-20V92a20 20 0 0120-20h72a20 20 0 0120 20v72a20 20 0 01-20 20zm-4-88H96v64h64z" />
    </Svg>
  );
}

export function InfoIcon(props: SVGProps) {
  const { size = 25, color = theme[400] } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M108 84a16 16 0 1116 16 16 16 0 01-16-16zm128 44A108 108 0 11128 20a108.12 108.12 0 01108 108zm-24 0a84 84 0 10-84 84 84.09 84.09 0 0084-84zm-72 36.68V132a20 20 0 00-20-20 12 12 0 00-4 23.32V168a20 20 0 0020 20 12 12 0 004-23.32z" />
    </Svg>
  );
}

export function ShareIcon(props: SVGProps) {
  const { size = 32, color = "black" } = props;
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
      {...props}
    >
      <Path d="M176 160a39.89 39.89 0 00-28.62 12.09l-46.1-29.63a39.8 39.8 0 000-28.92l46.1-29.63a40 40 0 10-8.66-13.45l-46.1 29.63a40 40 0 100 55.82l46.1 29.63A40 40 0 10176 160zm0-128a24 24 0 11-24 24 24 24 0 0124-24zM64 152a24 24 0 1124-24 24 24 0 01-24 24zm112 72a24 24 0 1124-24 24 24 0 01-24 24z" />
    </Svg>
  );
}
