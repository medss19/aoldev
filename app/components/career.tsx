'use client';

import React, { useState } from 'react';
import { Search, Briefcase, MapPin, Building, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

// Career Opportunities Data with enhanced details
const CareerOpportunities = [
    {
        title: 'Frontend Developer',
        type: 'Full-time',
        location: 'Remote',
        department: 'Engineering',
        experience: 'Mid-Level',
        description: 'Build intuitive user interfaces for our AI-powered platform.',
        skills: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
        title: 'AI Research Scientist',
        type: 'Remote',
        location: 'United States',
        department: 'Research',
        experience: 'Senior',
        description: 'Advance AI capabilities through machine learning research.',
        skills: ['Python', 'Machine Learning', 'Deep Learning'],
    },
    {
        title: 'Technical Writer',
        type: 'Part-time',
        location: 'United Kingdom',
        department: 'Documentation',
        experience: 'Entry-Level',
        description: 'Create comprehensive documentation for our technical ecosystem.',
        skills: ['Technical Writing', 'Markdown', 'API Documentation'],
    },
];

// Filter categories
const filters = {
    department: [
        'Engineering',
        'Research',
        'Documentation',
        'Product',
        'Marketing',
        'Sales',
    ],
    location: ['Remote', 'United States', 'United Kingdom', 'India', 'Germany'],
    type: ['Full-time', 'Part-time', 'Contract'],
    experience: ['Entry-Level', 'Mid-Level', 'Senior', 'Lead'],
};

export default function OpportunitiesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        department: [],
        location: [],
        type: [],
        experience: [],
    });

    // Filter jobs based on search query and active filters
    const filteredJobs = CareerOpportunities.filter(job => {
        const searchTerm = searchQuery.toLowerCase();
        const matchesSearch = 
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm));

        const matchesFilters = 
            (activeFilters.department.length === 0 || activeFilters.department.includes(job.department)) &&
            (activeFilters.location.length === 0 || activeFilters.location.includes(job.location)) &&
            (activeFilters.type.length === 0 || activeFilters.type.includes(job.type)) &&
            (activeFilters.experience.length === 0 || activeFilters.experience.includes(job.experience));

        return matchesSearch && matchesFilters;
    });

    const toggleFilter = (category, value) => {
        setActiveFilters(prev => ({
            ...prev,
            [category]: prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value],
        }));
    };

    const clearFilters = () => {
        setActiveFilters({
            department: [],
            location: [],
            type: [],
            experience: [],
        });
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <section className="text-center py-16 bg-gradient-to-br from-purple-50 to-white">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-900 tracking-tight">
                        Career Opportunities
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Join our team of passionate innovators and help shape the future of AI technology.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-8 py-8">
                {/* Filters Sidebar */}
                <aside className="md:w-64 flex-shrink-0">
                    <div className="sticky top-4 bg-white rounded-lg shadow-sm border border-purple-100 p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-purple-900 flex items-center">
                                <Filter className="w-5 h-5 mr-2" /> Filters
                            </h2>
                            {Object.values(activeFilters).some(arr => arr.length > 0) && (
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={clearFilters}
                                    className="text-purple-600 hover:text-purple-800"
                                >
                                    Clear all
                                </Button>
                            )}
                        </div>

                        {Object.entries(filters).map(([category, options]) => (
                            <div key={category} className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2 capitalize">
                                    {category}
                                </h3>
                                <div className="space-y-2">
                                    {options.map(option => (
                                        <div key={option} className="flex items-center">
                                            <Checkbox
                                                id={`${category}-${option}`}
                                                checked={activeFilters[category].includes(option)}
                                                onCheckedChange={() => toggleFilter(category, option)}
                                                className="border-purple-200"
                                            />
                                            <label
                                                htmlFor={`${category}-${option}`}
                                                className="ml-2 text-sm text-gray-600 cursor-pointer"
                                            >
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <Separator className="mt-4 bg-purple-100" />
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Jobs List */}
                <div className="flex-1">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                                type="text"
                                placeholder="Search by job title, skills, or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 border-2 border-purple-200 focus:border-purple-500 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-gray-600 mb-4">
                        Showing {filteredJobs.length} opportunities
                    </p>

                    {/* Jobs Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job, index) => (
                                <Card key={index} className="transition-all duration-300 hover:shadow-lg border-purple-100">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-purple-800">{job.title}</CardTitle>
                                        <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <Building className="w-4 h-4 mr-1" /> {job.department}
                                            </span>
                                            <span className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1" /> {job.location}
                                            </span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-4 text-gray-700">{job.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {job.skills.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <Button
                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
                                        >
                                            View Position
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-8">
                                <p className="text-gray-500">No jobs match your search criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}