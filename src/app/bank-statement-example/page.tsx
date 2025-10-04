"use client";

import BankStatements from "@/components/BankStatements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function BankStatementExample() {
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleSuccess = (data: any) => {
    console.log("Extracted data:", data);
    setExtractedData(data);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Bank Statement Upload</h1>
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          {/* Default button */}
          <div className="w-full p-4 border rounded-lg">
            <h2 className="text-lg font-medium mb-3">Default Button</h2>
            <BankStatements 
              buttonText="Upload Bank Statement"
              onSuccess={handleSuccess}
              allowedFileTypes={['.pdf', '.csv']}
              maxFileSizeMB={5}
            />
          </div>
          
          {/* Custom styled button */}
          <div className="w-full p-4 border rounded-lg">
            <h2 className="text-lg font-medium mb-3">Custom Button</h2>
            <BankStatements 
              buttonText="Upload Statement"
              buttonVariant="outline"
              buttonClassName="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300"
              onSuccess={handleSuccess}
              allowedFileTypes={['.pdf', '.csv']}
              maxFileSizeMB={5}
            />
          </div>
        </div>
        
        {extractedData && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Extracted Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-96">
                {JSON.stringify(extractedData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}