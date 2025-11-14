import { signOut } from "@/api";
import { getMyProfile } from "@/api/userApi";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/apiTypes";
import { FileText, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PDFList from "./PDFList";
import PDFUpload from "./PDFUpload";

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getMyProfile();
        setUser(profile);
      } catch (err) {
        console.log(err)
        // If backend says token invalid, logout user
        localStorage.removeItem("authToken");
        navigate("/auth");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSignOut = async () => {
    signOut();
    toast.success("Signed out", {
      description: "You have been signed out successfully",
    });
    navigate("/auth");
  };

  const handleUploadComplete = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (!user) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-glow">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="">
                <h1 className="text-xl font-bold gradient-text">PDF Manager</h1>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-0 py-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
            <p className="text-muted-foreground">
              Manage your PDF documents securely in one place
            </p>
          </div>

          <PDFUpload onUploadComplete={handleUploadComplete} />
          <PDFList refreshTrigger={refreshTrigger} />
        </div>
      </main>
    </div>
  );
};

export default Home;
