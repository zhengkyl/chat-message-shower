import { Twitch } from "@/components/icons/Twitch";

export function App() {
  return (
    <div class="flex flex-col gap-4 text-center">
      <h1 class="text-xl font-bold">
        Sign in to <div class="whitespace-pre">Chat Message Shower</div>
      </h1>
      <a
        href={import.meta.env.VITE_SERVER_URL + "/auth/twitch"}
        class="flex justify-center items-center gap-2 px-2 py-3 rounded border bg-zinc-800 font-semibold"
      >
        <Twitch />
        <span>Continue with Twitch</span>
      </a>
    </div>
  );
}
