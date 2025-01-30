'use client';

import React, { useState } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';
import { getJobById, validateJobApplication } from '../jobs-data';

// This data would typically come from your API/database
const jobsData = {
  'frontend-developer': {
    title: 'Frontend Developer',
    department: 'Engineering',
    requiredDocuments: ['Resume', 'Cover Letter'],
    additionalFields: []
  },
  'ai-researcher': {
    title: 'AI Research Scientist',
    department: 'Research',
    requiredDocuments: ['Resume', 'Cover Letter', 'Research Papers'],
    additionalFields: ['publications', 'researchAreas']
  },
  'technical-writer': {
    title: 'Technical Writer',
    department: 'Documentation',
    requiredDocuments: ['Resume', 'Cover Letter', 'Writing Samples'],
    additionalFields: ['writingSamples']
  }
};

const ApplicationForm = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  const job = getJobById(jobId);

  // Add error handling for invalid job IDs
  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-purple-600 hover:text-purple-800"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Job Details
        </Button>
        <Card className="border-red-100">
          <CardHeader>
            <CardTitle className="text-2xl text-red-900">
              Invalid Job Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              The requested job position was not found. Please return to the careers page and try again.
            </p>
            <Button
              variant="ghost"
              className="mt-4 text-purple-600 hover:text-purple-800"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Careers
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    coverletter: '',
    // Additional fields based on job type
    publications: '',
    researchAreas: '',
    writingSamples: '',
  });

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would submit the form data along with the jobId
    const applicationData = {
      jobId,
      ...formData,
      files
    };
    console.log('Submitting application for job:', jobId, applicationData);
    // Actual API call would go here
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        className="mb-6 text-purple-600 hover:text-purple-800"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Job Details
      </Button>

      <Card className="border-purple-100">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-900">
            Apply for {job.title}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Position: {job.title} - {job.department}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Common Fields Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Professional Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Professional Links</h3>
              <div className="space-y-4">
                <Input
                  placeholder="LinkedIn Profile URL"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                />
                <Input
                  placeholder="Portfolio/Website URL"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                />
              </div>
            </div>

            {/* Job-Specific Fields */}
            {job.additionalFields.includes('publications') && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-4">Publications</h3>
                  <Textarea
                    placeholder="List your relevant publications..."
                    value={formData.publications}
                    onChange={(e) => setFormData({ ...formData, publications: e.target.value })}
                  />
                </div>
              </>
            )}

            {job.additionalFields.includes('researchAreas') && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-4">Research Areas</h3>
                  <Textarea
                    placeholder="Describe your research areas and interests..."
                    value={formData.researchAreas}
                    onChange={(e) => setFormData({ ...formData, researchAreas: e.target.value })}
                  />
                </div>
              </>
            )}

            <Separator />

            {/* Cover Letter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Cover Letter</h3>
              <Textarea
                placeholder="Tell us why you're interested in this position..."
                className="min-h-[200px]"
                value={formData.coverletter}
                onChange={(e) => setFormData({ ...formData, coverletter: e.target.value })}
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please upload: {job.requiredDocuments.join(', ')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-purple-600" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      multiple
                    />
                  </label>
                </div>

                {/* File List */}
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-purple-50 rounded"
                    >
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;