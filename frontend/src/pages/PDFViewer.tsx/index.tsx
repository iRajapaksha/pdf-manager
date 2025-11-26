import axiosInstance from "@/api/axiosInstance";
import { getPdfDocument, getPDFUrl } from "@/api/pdfApi";
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
// react-pdf requires these styles for text & annotation layers (prevents warnings)
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
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
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [triedBlobFetch, setTriedBlobFetch] = useState(false);
  const [originalName, setOriginalName] = useState<string | null>(null);

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
        setOriginalName(response.data?.originalName || null);
        const data = response.data || {};

        let url: string | null = null;

        if (data.filePath) {
          // Old-style response: server returns filePath that needs resolution
          url = await getPDFUrl(data.filePath);
        } else if (data.url) {
          const raw = String(data.url);
          if (/^https?:\/\//i.test(raw)) {
            url = raw; // absolute
          } else if (raw.startsWith("/")) {
            // Use axiosInstance baseURL to compute origin (strip trailing /api)
            const apiBase =
              axiosInstance.defaults.baseURL || window.location.origin;
            const origin = apiBase.replace(/\/api\/?$/, "");
            url = origin + raw;
          } else {
            url = window.location.origin + "/" + raw;
          }
        }

        if (url) {
          setPdfUrl(url);
        }
      } catch (error) {
        const errorMessage = axios.isAxiosError(error);
        console.log(errorMessage);

        toast.error("Error", { description: "Failed to load PDF" });
        navigate("/");
      }
    };

    checkAuth();
  }, [pdfId, fileName, navigate]);

  // revoke object URLs when changed/unmounted
  useEffect(() => {
    return () => {
      if (objectUrl) {
        try {
          URL.revokeObjectURL(objectUrl);
        } catch (e) {
          console.error("Failed to revoke object URL", e);
        }
      }
    };
  }, [objectUrl]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = async (err: Error) => {
    console.warn("react-pdf onLoadError:", err);
    // try fetching as blob once if not already attempted
    if (pdfUrl && !triedBlobFetch) {
      try {
        setTriedBlobFetch(true);
        const res = await axios.get(pdfUrl, { responseType: "blob" });
        const blob = res.data as Blob;
        const objUrl = URL.createObjectURL(blob);
        setObjectUrl(objUrl);
        setPdfUrl(objUrl);
      } catch (e) {
        console.error("Blob fallback failed", e);
      }
    }
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-secondary/20">
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
                  {originalName || "PDF Document"}
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
                onLoadError={onDocumentLoadError}
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

// cleanup object url on unmount
// (This cleanup is placed outside the component effect because objectUrl is a component state —
//  we ensure revocation when objectUrl changes)

export default PDFViewer;
