import useLocalStorage from "use-local-storage";

export function useShouldSpeak() {
  const [shouldSpeak, setShouldSpeak] = useLocalStorage("igbo-flashcards:shouldSpeak", true);
  return { shouldSpeak, setShouldSpeak };
}
