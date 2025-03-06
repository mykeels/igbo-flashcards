import { Howl} from "howler";

export const audio = (src: string, options: { rate?: number } = {}) =>
  new Howl({
    ...options,
    src: [src],
    preload: true,
    volume: 0.8,
  });

export const sequence = (
  fileNames: string[],
  options: { rate?: number; call?: number } = {}
) => {
  const audios: Howl[] = [];
  const audio = new Howl({
    src: [fileNames[0]],
    preload: true,
    onend: function () {
      fileNames.shift();
      if (fileNames.length > 0) {
        audios.push(sequence(fileNames, { ...options, call: (options?.call ?? 0) + 1 }));
      }
    },
    onstop: function () {
      audios.forEach((audio) => audio.stop());
    },
  });
  if (options?.call) {
    audio.play();
  }
  return audio;
};