import { LoginCard } from "./LoginCard";

export function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-8 duration-700 ease-in">
        <LoginCard />
      </div>
    </div>
  );
}
