import React from 'react';
import { useNavigate } from 'react-router-dom';
import posts from '../../data/blog.json';
import './Blog.css';

export default function Blog() {
  const navigate = useNavigate();

  return (
    <div className="blog-page">
      <h2 className="blog-list-title">Blog</h2>
      <p className="blog-list-subtitle">Thoughts, tutorials, and dev logs.</p>
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.id} className="blog-card" onClick={() => navigate(`/blog/${post.id}`)}>
            <div className="blog-thumb" style={{ background: post.thumbnail.gradient }}>
              <span>{post.thumbnail.icon}</span>
            </div>
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.category}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
