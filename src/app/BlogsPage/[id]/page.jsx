'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, ArrowLeft, Clock, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts, recentPosts, popularTags } from '../../../data/blogs';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import Image from 'next/image';

const BlogDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const blogId = parseInt(params.id);

    const post = blogPosts.find(p => p.id === blogId);

    const relatedPosts = blogPosts
        .filter(p => p.category === post?.category && p.id !== blogId)
        .slice(0, 3);

    if (!post) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
                        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
                        <button
                            onClick={() => router.push('/BlogsPage')}
                            className="bg-[#0e8601] text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            Back to Blogs
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const handleGoBack = () => {
        router.push('/BlogsPage');
    };

    const handleRelatedPostClick = (postId) => {
        router.push(`/BlogsPage/${postId}`);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50">
                <div
                    className="relative mt-32 h-[500px] bg-gray-800 flex items-center justify-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/img/healthstethoscope.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="container mx-auto px-4">
                        <button
                            onClick={handleGoBack}
                            className="flex items-center text-white mb-6 hover:text-gray-300 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Blogs
                        </button>

                        <div className="max-w-4xl">
                            <div className="flex items-center mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${post.category === 'health'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-green-100 text-green-800'
                                    }`}>
                                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-gray-300">
                                <div className="flex items-center">
                                    <Image
                                        src={post.authorImage}
                                        alt={post.author}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 rounded-full mr-3 object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-white">{post.author}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{post.date}</span>
                                </div>

                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-2/3">
                            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-8 lg:p-12">
                                    <div className="text-xl text-gray-700 leading-relaxed mb-8 font-light border-l-4 border-[#0e8601] pl-6 bg-gray-50 p-6 rounded-r-lg">
                                        {post.excerpt}
                                    </div>

                                    <div className="prose prose-lg max-w-none">
                                        {post.content && (
                                            <>
                                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                                                <p className="text-gray-700 mb-6 leading-relaxed">
                                                    {post.content.introduction}
                                                </p>

                                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Findings</h2>
                                                {Array.isArray(post.content.keyFindings) ? (
                                                    <ul className="list-disc pl-6 mb-6 space-y-2">
                                                        {post.content.keyFindings.map((finding, index) => (
                                                            <li key={index} className="text-gray-700 leading-relaxed">
                                                                {finding}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                                        {post.content.keyFindings}
                                                    </p>
                                                )}

                                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Methodology</h2>
                                                <p className="text-gray-700 mb-6 leading-relaxed">
                                                    {post.content.methodology}
                                                </p>

                                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommendations</h2>
                                                {Array.isArray(post.content.recommendations) ? (
                                                    <ul className="list-disc pl-6 mb-6 space-y-2">
                                                        {post.content.recommendations.map((recommendation, index) => (
                                                            <li key={index} className="text-gray-700 leading-relaxed">
                                                                {recommendation}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                                        {post.content.recommendations}
                                                    </p>
                                                )}

                                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
                                                <p className="text-gray-700 mb-6 leading-relaxed">
                                                    {post.content.conclusion}
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    <div className="border-t pt-8 mt-8">
                                        <div className="flex items-center flex-wrap gap-2">
                                            <Tag className="w-4 h-4 text-gray-500 mr-2" />
                                            <span className="text-gray-600 font-medium mr-3">Tags:</span>
                                            {popularTags.slice(0, 4).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-[#0e8601] hover:text-white cursor-pointer transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t pt-8 mt-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Share2 className="w-5 h-5 text-gray-500 mr-3" />
                                                <span className="text-gray-600 font-medium">Share this article</span>
                                            </div>

                                            <div className="flex space-x-3">
                                                <a
                                                    href="#"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                                                >
                                                    <span className="sr-only">Share on Facebook</span>
                                                    <Facebook className="h-4 w-4" />
                                                </a>

                                                <a
                                                    href="https://x.com/arin_africa"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                                                >
                                                    <span className="sr-only">Share on Twitter</span>
                                                    <Twitter className="h-4 w-4" />
                                                </a>

                                                <a
                                                    href="https://www.linkedin.com/company/arin-africa/posts/?feedView=all"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                                                >
                                                    <span className="sr-only">Share on LinkedIn</span>
                                                    <Linkedin className="h-4 w-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {relatedPosts.length > 0 && (
                                <div className="mt-12">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {relatedPosts.map((relatedPost) => (
                                            <div
                                                key={relatedPost.id}
                                                onClick={() => handleRelatedPostClick(relatedPost.id)}
                                                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                                            >
                                                <div className="p-6">
                                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-[#0e8601] transition-colors">
                                                        {relatedPost.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                        {relatedPost.excerpt}
                                                    </p>
                                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                                        <span>{relatedPost.author}</span>
                                                        <span>{relatedPost.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">About the Author</h3>
                                <div className="flex items-start space-x-4">
                                    <Image
                                        src={post.authorImage}
                                        alt={post.author}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-2">{post.author}</h4>
                                        <p className="text-gray-600 text-sm">
                                            Expert researcher focusing on climate change and health intersections
                                            across African communities.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                                <div className="space-y-4">
                                    {recentPosts.map((recentPost) => (
                                        <div
                                            key={recentPost.id}
                                            onClick={() => handleRelatedPostClick(recentPost.id)}
                                            className="flex items-start space-x-3 group cursor-pointer"
                                        >
                                            <Image
                                                src={recentPost.image}
                                                alt={recentPost.title}
                                                width={64}
                                                height={48}
                                                className="w-16 h-12 rounded object-cover flex-shrink-0"
                                            />
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#0e8601] transition-colors line-clamp-2">
                                                    {recentPost.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">{recentPost.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#0e8601] text-white rounded-lg p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                                <p className="text-green-100 mb-4 text-sm">
                                    Subscribe to our newsletter for the latest research updates and insights.
                                </p>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <button className="w-full bg-white text-[#0e8601] py-2 rounded font-medium hover:bg-gray-100 transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default BlogDetailPage;