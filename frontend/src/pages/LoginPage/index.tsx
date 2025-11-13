import { FileText } from "lucide-react";
import { LoginCard } from "./LoginCard";

export function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-linear-to-br ">
      <div className="w-full max-w-sm space-y-8">
        {/* Header with logo, title, and subtitle */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-4 shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">PDF Manager</h1>
          <p className="text-gray-500 text-lg">
            Secure PDF storage and viewing
          </p>
        </div>

        {/* Login Card */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-in">
          <LoginCard />
        </div>
      </div>
    </div>
  );
}
