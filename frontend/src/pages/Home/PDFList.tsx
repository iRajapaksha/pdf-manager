import { deletePdf, getPDFs } from "@/api/pdfApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PDF } from "@/types/apiTypes";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Clock, Eye, FileText, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PDFListProps {
  refreshTrigger: number;
}

const PDFList = ({ refreshTrigger }: PDFListProps) => {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  const fetchPDFs = async () => {
    try {
      const data = await getPDFs();
      setPdfs(data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching PDFs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, [refreshTrigger]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this PDF?")) return;

    setDeletingId(id);

    try {
      await deletePdf(id);
      toast.success("Success", {
        description: "PDF deleted successfully",
      });
      fetchPDFs();
    } catch (error) {
      console.log(error);

      toast.error("Error deleting PDF", {
        description: axios.isAxiosError(error),
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (pdf: PDF) => {
    navigate(
      `/pdf-viewer?id=${pdf.id}&name=${encodeURIComponent(pdf.fileName)}`
    );
  };

  if (loading) {
    return (
      <Card className="glass-card shadow-elegant border-border/50">
        <CardContent className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card shadow-elegant border-border/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>Your PDFs</CardTitle>
            <CardDescription>
              {pdfs.length === 0
                ? "No PDFs uploaded yet"
                : `${pdfs.length} PDF${
                    pdfs.length !== 1 ? "s" : ""
                  } in your library`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {pdfs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              Upload your first PDF to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="group flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/5 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                      {pdf.originalName}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>{(pdf.size / 1024 / 1024).toFixed(2)} MB</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(pdf.uploadedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(pdf)}
                    className="gap-2 hover:bg-primary hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(pdf.id)}
                    disabled={deletingId === pdf.id}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    {deletingId === pdf.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFList;
