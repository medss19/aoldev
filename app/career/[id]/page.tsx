'use client';

import React from 'react';
import { ArrowLeft, Building, MapPin, Clock, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { getJobById } from '../jobs-data';

const JobDetailPage = ({ params }) => {
    const job = getJobById(params.id);
    const router = useRouter();

    if (!job) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Card className="border-red-100">
                    <CardHeader>
                        <CardTitle className="text-2xl text-red-900">Job Not Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">The job position you're looking for could not be found.</p>
                        <Button
                            variant="outline"
                            className="text-purple-600 hover:text-purple-800"
                            onClick={() => router.push('/career')}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Careers
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Button
                variant="ghost"
                className="mb-6 text-purple-600 hover:text-purple-800"
                onClick={() => window.history.back()}
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Opportunities
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <Card className="mb-8 border-purple-100">
                        <CardHeader>
                            <CardTitle className="text-3xl text-purple-900">{job.title}</CardTitle>
                            <div className="flex flex-wrap gap-4 text-gray-600 mt-4">
                                <span className="flex items-center">
                                    <Building className="w-4 h-4 mr-2" />
                                    {job.department}
                                </span>
                                <span className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {job.location}
                                </span>
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {job.type}
                                </span>
                                <span className="flex items-center">
                                    <GraduationCap className="w-4 h-4 mr-2" />
                                    {job.experience}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="prose max-w-none">
                                <p className="text-lg text-gray-700 mb-6">{job.description}</p>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {job.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Separator className="my-6" />
                                <div className="whitespace-pre-line text-gray-700">
                                    {job.fullDescription}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Application Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-4 border-purple-100">
                        <CardHeader>
                            <CardTitle className="text-xl text-purple-900">Apply Now</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-2">Benefits</h3>
                                    <ul className="space-y-2">
                                        {job.benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-purple-600 mr-2">•</span>
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Button
                                    className="w-full bg-purple-600 hover:bg-purple-700"
                                    onClick={() => router.push(`/career/apply?jobId=${job.id}`)}
                                >
                                    Apply for this position
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Save for later
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;