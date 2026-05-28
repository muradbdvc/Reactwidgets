import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import posts from '../../data/blog.json';
import './Blog.css';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="blog-page">
        <div className="blog-post">
          <h2>Post not found</h2>
          <p>The blog post you're looking for doesn't exist.</p>
          <button className="back-btn" onClick={() => navigate('/blog')}>← Back to Blog</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <article className="blog-post">
        <button className="back-btn" onClick={() => navigate('/blog')}>← Back to Blog</button>

        <div className="post-banner" style={{ background: post.thumbnail.gradient }}>
          <span>{post.thumbnail.icon}</span>
        </div>

        <div className="meta">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.category}</span>
        </div>

        <h2>{post.title}</h2>
        <p className="subtitle">{post.subtitle}</p>

        {post.sections.map((section, i) => {
          switch (section.type) {
            case 'heading':
              return <h3 key={i}>{section.text}</h3>;
            case 'paragraph':
              return <p key={i}>{section.text}</p>;
            case 'list':
              return (
                <ul key={i}>
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            case 'code':
              return (
                <div key={i} className="code-block">
                  <code>{section.text}</code>
                </div>
              );
            case 'divider':
              return <hr key={i} className="divider" />;
            default:
              return null;
          }
        })}
      </article>
    </div>
  );
}
