import { useCallback, useEffect, useRef, useState } from "react";
import useEventListener from "@/hooks/useEventListener/useEventListener";

export interface UseAudioOptions {
  /**
   * Initial volume (0 to 1).
   * @default 1
   */
  volume?: number;
  /**
   * Whether the audio should loop when it ends.
   * @default false
   */
  loop?: boolean;
  /**
   * Whether the audio should start playing automatically when loaded.
   * @default false
   */
  autoPlay?: boolean;
  /**
   * Callback fired on each timeupdate event with the current playback time in seconds.
   * Use this instead of polling `time` state to avoid unnecessary re-renders.
   */
  onTimeUpdate?: (time: number) => void;
  /**
   * Callback fired when audio metadata is loaded with the total duration in seconds.
   */
  onLoadedMetadata?: (duration: number) => void;
}

export interface UseAudioState {
  /**
   * Indicates whether the audio is currently playing. This state is updated based on the audio element's play, pause, and ended events, allowing you to track the playback status in your component.
   */
  isPlaying: boolean;
  /**
   * The current volume of the audio (0 to 1). This state is updated when you call the setVolume method, allowing you to track the current volume level in your component.
   */
  volume: number;
  /**
   * If an error occurs while loading or playing the audio, this state will contain the error message. Otherwise, it will be null. This allows you to handle and display any issues that arise with the audio element.
   */
  error: string | null;
}

export interface UseAudioControls {
  /**
   * Start or resume audio playback.
   */
  play: () => void;
  /**
   * Pause audio playback.
   */
  pause: () => void;
  /**
   * Toggle between play and pause states.
   */
  toggle: () => void;
  /**
   * Stop audio playback and reset to the beginning.
   */
  stop: () => void;
  /**
   * Set the audio volume (0 to 1). Values outside this range will be clamped.
   * @param volume
   */
  setVolume: (volume: number) => void;
}

export interface UseAudioReturn extends UseAudioState, UseAudioControls {}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const useAudio = (src: string, options?: UseAudioOptions): UseAudioReturn => {
  const { loop = false, autoPlay = false } = { ...options };
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(options?.volume ?? 1);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /**
   * Create the Audio instance if needed, sync source and options, and clean up on unmount or source change.
   */
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    audio.src = src;
    audio.volume = clamp(options?.volume ?? 1, 0, 1);
    audio.loop = loop;
    audio.load();

    setIsPlaying(false);
    setVolumeState(clamp(options?.volume ?? 1, 0, 1));
    setError(null);

    if (autoPlay) {
      audio.play().catch((err) => {
        setError(err instanceof Error ? err.message : "Autoplay was prevented");
      });
    }

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, [autoPlay, options?.volume, loop, src]);

  /**
   * When the audio metadata is loaded, we call the onLoadedMetadata callback if provided.
   */
  useEventListener("loadedmetadata", () => options?.onLoadedMetadata?.(audioRef.current?.duration || 0), audioRef);

  /**
   * When the audio current time updates (e.g., during playback), we call the onTimeUpdate callback if provided.
   */
  useEventListener("timeupdate", () => options?.onTimeUpdate?.(audioRef.current?.currentTime || 0), audioRef);

  /**
   * When the audio starts playing, we set isPlaying to true. This covers both user-initiated play actions and programmatic play via the play() method.
   */
  useEventListener("play", () => setIsPlaying(true), audioRef);

  /**
   * When the audio is paused, we set isPlaying to false. This covers both user-initiated pauses and programmatic pauses via the pause() method.
   */
  useEventListener("pause", () => setIsPlaying(false), audioRef);

  /**
   * When the audio ends, we set isPlaying to false.
   */
  useEventListener(
    "ended",
    () => {
      setIsPlaying(false);
    },
    audioRef,
  );

  /**
   * If an error occurs while loading the audio, we capture the error message and set isPlaying to false.
   */
  useEventListener(
    "error",
    () => {
      setError(audioRef.current?.error?.message || "An error occurred while loading the audio");
      setIsPlaying(false);
    },
    audioRef,
  );

  const play = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.currentTime = 0;
    }

    audio.play().catch((err) => {
      setError(err instanceof Error ? err.message : "Play was prevented");
    });
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.play().catch((err) => {
        setError(err instanceof Error ? err.message : "Play was prevented");
      });
    } else {
      audio.pause();
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, []);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const clamped = clamp(v, 0, 1);
    audio.volume = clamped;
    setVolumeState(clamped);
  }, []);

  return {
    error,
    isPlaying,
    pause,
    play,
    setVolume,
    stop,
    toggle,
    volume,
  };
};

export default useAudio;
