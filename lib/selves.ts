const crops = [
  [0, 330],
  [360, 330],
  [700, 355],
  [1030, 425],
  [1460, 340],
  [1800, 372],
] as const;
export const cropStyle = (index: number) => {
  const [left, width] = crops[index];
  return {
    '--crop-width': width,
    '--crop-position': `${(left / (2172 - width)) * 100}%`,
    '--crop-mask':
      index === 2
        ? 'polygon(0 0,100% 0,100% 65%,90% 65%,90% 100%,0 100%)'
        : index === 3
          ? 'polygon(12% 0,100% 0,100% 100%,0 100%,0 45%,12% 45%)'
          : 'none',
  };
};
