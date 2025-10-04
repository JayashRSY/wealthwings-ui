import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { uploadBankStatement } from '@/api/bankApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BankStatementsProps {
  onUpload?: (file: File) => void;
  onSuccess?: (data: any) => void;
  allowedFileTypes?: string[];
  maxFileSizeMB?: number;
  buttonText?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  buttonClassName?: string;
}

const BankStatements: React.FC<BankStatementsProps> = ({
  onUpload,
  onSuccess,
  allowedFileTypes = ['.pdf', '.csv', '.xlsx', '.xls'],
  maxFileSizeMB = 10,
  buttonText = "Upload Bank Statement",
  buttonVariant = "default",
  buttonClassName = ""
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setUploadError(null);
    setExtractedData(null);
    
    if (!selectedFile) {
      return;
    }

    // Validate file type
    const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      setUploadError(`Invalid file type. Allowed types: ${allowedFileTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (selectedFile.size > maxFileSizeMB * 1024 * 1024) {
      setUploadError(`File size exceeds ${maxFileSizeMB}MB limit`);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Create FormData for API upload
      const formData = new FormData();
      formData.append('file', file);
      
      // Call custom onUpload if provided
      if (onUpload) {
        await onUpload(file);
      }
      
      // Call the API to upload and extract data
      const response = await uploadBankStatement(formData);
      
      if (response.success) {
        toast.success('Bank statement uploaded and processed successfully');
        setExtractedData(response.data);
        
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess(response.data);
        }
        
        // Reset file after successful upload
        setFile(null);
        // Reset the file input
        const fileInput = document.getElementById('bank-statement-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
        // Close the modal
        setOpen(false);
      } else {
        throw new Error(response.message || 'Failed to process bank statement');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload bank statement. Please try again.';
      setUploadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setUploadError(null);
    setExtractedData(null);
    const fileInput = document.getElementById('bank-statement-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetState();
    }}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} className={buttonClassName}>
          <Plus className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Upload Bank Statement
          </DialogTitle>
          <DialogDescription>
            Upload your bank statement to analyze your financial transactions
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer ${
              uploadError ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            onClick={() => document.getElementById('bank-statement-upload')?.click()}
          >
            <input
              type="file"
              id="bank-statement-upload"
              className="hidden"
              onChange={handleFileChange}
              accept={allowedFileTypes.join(',')}
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-8 w-8 text-gray-400" />
              {file ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">{file.name}</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Click to upload or drag and drop your bank statement
                </p>
              )}
              <p className="text-xs text-gray-400">
                Supported formats: {allowedFileTypes.join(', ')} (Max: {maxFileSizeMB}MB)
              </p>
            </div>
          </div>

          {uploadError && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              {uploadError}
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!file || isUploading} 
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload Bank Statement'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BankStatements;