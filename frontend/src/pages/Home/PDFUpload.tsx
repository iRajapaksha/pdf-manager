import { uploadPDF } from "@/api/pdfApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FileText, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PDFUploadProps {
  onUploadComplete: () => void;
}

const PDFUpload = ({ onUploadComplete }: PDFUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast("Invalid file type", { description: "Please select a PDF file" });
      }
    }
  };
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      await uploadPDF(file);

      toast.success("Success!", { description: "PDF uploaded successfully" });

      setFile(null);
      onUploadComplete();
    } catch (error) {
      toast.error("Upload failed", { description: axios.isAxiosError(error) });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="glass-card shadow-elegant border-border/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>Upload PDF</CardTitle>
            <CardDescription>
              Upload a new PDF document to your library
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pdf-upload">Select PDF File</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                disabled={uploading}
                className="cursor-pointer"
              />
            </div>
          </div>
          {file && (
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg border border-border/50">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium truncate">{file.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          )}
        </div>
        <Button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-primary hover:opacity-90 transition-opacity shadow-glow"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload PDF
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PDFUpload;
