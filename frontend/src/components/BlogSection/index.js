// BlogSection.jsx
import React from 'react';
import './BlogSection.css';

const BlogSection = () => {
    const posts = [
        {
            id: 1,
            title: 'How to Choose the Perfect Domain Name',
            category: 'Domaining',
            date: 'March 15, 2024',
            excerpt: 'Learn the art of selecting domain names that boost brand recognition and SEO performance...',
            image: 'https://picsum.photos/400/250?random=1',
            readTime: '5 min read'
        },
        {
            id: 2,
            title: 'Top 10 Domain Trends for 2024',
            category: 'Trends',
            date: 'March 12, 2024',
            excerpt: 'Discover the latest trends in domain extensions and digital real estate investments...',
            image: 'https://picsum.photos/400/250?random=2',
            readTime: '8 min read'
        },
        {
            id: 3,
            title: 'Domain Security Best Practices',
            category: 'Security',
            date: 'March 10, 2024',
            excerpt: 'Essential tips to protect your domains from hijacking and unauthorized transfers...',
            image: 'https://picsum.photos/400/250?random=3',
            readTime: '6 min read'
        }
    ];

    return (
        <section className="blog-section">
            <div className="blog-container">
                <div className="section-header">
                    <h2>Latest Resources & Insights</h2>
                    <p className="subtitle">Stay ahead with our expert domain knowledge</p>
                </div>

                <div className="blog-grid">
                    {posts.map(post => (
                        <article className="blog-card" key={post.id}>
                            <div className="card-image">
                                <img src={post.image} alt={post.title} />
                                <span className="category-tag">{post.category}</span>
                            </div>
                            <div className="card-content">
                                <div className="meta-info">
                                    <time>{post.date}</time>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-excerpt">{post.excerpt}</p>
                                <button className="read-more">
                                    Read Article
                                    <svg xmlns="http://www.w3.org/2000/svg" className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="cta-container">
                    <button className="view-all-button">
                        View All Resources
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;