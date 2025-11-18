import { getPdfDocument, getPDFUrl, logActivity } from "@/api/pdfApi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState(true);

  const pdfId = searchParams.get("id");
  const fileName = searchParams.get("name");
  useEffect(() => {
    const checkAuth = async () => {
      if (!pdfId) {
        navigate("/");
        return;
      }

      try {
        const response = await getPdfDocument(pdfId);
        const filePath = response.data.filePath;

        if (filePath) {
          const url = await getPDFUrl(filePath); 
          if (url) {
            setPdfUrl(url);
            await logActivity("view", "pdf", pdfId, { file_name: fileName });
          }
        }
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
        console.log(errorMessage);
        
        toast.error("Error", { description: "Failed to load PDF" });
        navigate("/");
      }
    };

    checkAuth();
  }, [pdfId, fileName, navigate, toast]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-accent/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold">
                  {fileName || "PDF Document"}
                </h1>
                {numPages > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Page {pageNumber} of {numPages}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={zoomOut}
                disabled={scale <= 0.6}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-16 text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={zoomIn}
                disabled={scale >= 2.0}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="glass-card shadow-elegant p-4 md:p-8">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {pdfUrl && (
            <div className="flex flex-col items-center">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                }
                error={
                  <div className="text-center py-20 text-destructive">
                    Failed to load PDF file
                  </div>
                }
                className="max-w-full"
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  className="shadow-lg"
                />
              </Document>

              {numPages > 1 && (
                <div className="flex items-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={previousPage}
                    disabled={pageNumber <= 1}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm font-medium">
                    {pageNumber} / {numPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={nextPage}
                    disabled={pageNumber >= numPages}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default PDFViewer;
