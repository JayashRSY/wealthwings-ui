import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardStatementView from "../../../../components/CardStatementView";
import { uploadStatement } from "@/api/cardApi";

interface ExtractedStatement {
  [key: string]: any;
}

const StatementUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedStatement | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setExtractedData(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    setExtracting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("statement", file);
      const data = await uploadStatement(formData);
      setExtractedData(data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to process statement.");
    } finally {
      setExtracting(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Upload Credit Card Statement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.csv,.xls,.xlsx"
            onChange={handleFileChange}
            disabled={extracting}
          />
          <Button
            onClick={handleUpload}
            disabled={!file || extracting}
            className="w-full"
          >
            {extracting ? "Processing..." : "Upload & Process Statement"}
          </Button>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {extractedData && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Statement Result</h3>
              {extractedData?.data && (
                <CardStatementView data={extractedData.data} />
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatementUpload;
